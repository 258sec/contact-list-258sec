import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

function ContactCard({ contact }) {
  const { deleteContact } = useContacts();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteContact(contact.id);
  };

  const handleEdit = () => {
    navigate("/add-contact", { state: contact });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">Email: {contact.email}</p>
        <p className="card-text">Teléfono: {contact.phone}</p>
        <button className="btn btn-danger me-2" onClick={handleDelete}>Borrar</button>
        <button className="btn btn-primary" onClick={handleEdit}>Editar</button>
      </div>
    </div>
  );
}

export default ContactCard;