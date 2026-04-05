import { useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import ContactCard from "../Componentes/ContactCard";
import { useNavigate } from "react-router-dom"; // 👈 añadir

function Contacts() {
  const { state, getContacts } = useContacts();
  const navigate = useNavigate(); // 👈 añadir

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Lista de contactos</h1>
        <button className="btn btn-success" onClick={() => navigate("/add-contact")}>
          + Agregar contacto
        </button>
      </div>
      {state.contacts.length === 0 ? (
        <p className="text-muted">No hay contactos aún. ¡Añade uno!</p>
      ) : (
        state.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
}

export default Contacts;