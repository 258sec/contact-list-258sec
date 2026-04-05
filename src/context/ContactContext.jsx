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
    // 👉 Primero intentamos crear la agenda (si ya existe no pasa nada)
    await fetch("https://playground.4geeks.com/contact/agendas/258sec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // 👉 Luego obtenemos los contactos
    const response = await fetch("https://playground.4geeks.com/contact/agendas/258sec/contacts");
    const data = await response.json();
    console.log("data:", data); // 👈 para ver la estructura exacta
    dispatch({
      type: "SAVE_CONTACTS",
      payload: data.contacts ?? [],
    });
  } catch (error) {
    console.error(error);
  }
}, []);

  async function addContact(contact) {
    await fetch("https://playground.4geeks.com/contact/agendas/258sec/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    getContacts();
  }

  async function deleteContact(id) {
    await fetch(`https://playground.4geeks.com/contact/agendas/258sec/contacts/${id}`, {
      method: "DELETE",
    });
    getContacts();
  }

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

export function useContacts() {
  return useContext(ContactContext);
}