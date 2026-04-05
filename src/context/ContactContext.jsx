import { createContext, useReducer, useContext, useCallback } from "react";

const ContactContext = createContext();

const InitialState = { contacts: [] };

function ContactReducer(state, action) {
  switch (action.type) {
    case "SAVE_CONTACTS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(ContactReducer, InitialState);

 const getContacts = useCallback(async () => {
  try {
       // Comprobamos si la agenda existe
    const checkResponse = await fetch("https://playground.4geeks.com/contact/agendas/258sec");

    // Si no existe (404), la creamos
    if (checkResponse.status === 404) {
      await fetch("https://playground.4geeks.com/contact/agendas/258sec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    }
    // Cargamos los contactos
    const response = await fetch("https://playground.4geeks.com/contact/agendas/258sec/contacts");
    const data = await response.json();
    dispatch({
      type: "SAVE_CONTACTS",
      payload: data.contacts ?? [],
    });
  } catch (error) {
    console.error(error);
  }
}, []);
//agregar contacto
  async function addContact(contact) {
    await fetch("https://playground.4geeks.com/contact/agendas/258sec/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    getContacts();
  }
//eliminar contacto
  async function deleteContact(id) {
    await fetch(`https://playground.4geeks.com/contact/agendas/258sec/contacts/${id}`, {
      method: "DELETE",
    });
    getContacts();
  }
//actualizar contacto
  async function updateContact(id, updatedContact) {
    await fetch(`https://playground.4geeks.com/contact/agendas/258sec/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    });
    getContacts();
  }

  return (
    <ContactContext.Provider value={{ state, getContacts, addContact, deleteContact, updateContact }}>
      {children}
    </ContactContext.Provider>
  );
}
// creamos esta funcion para no tener que importar por separado en cada archivo
export function useContacts() {
  return useContext(ContactContext);
}