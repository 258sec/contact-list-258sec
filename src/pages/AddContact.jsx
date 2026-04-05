import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useLocation, useNavigate } from "react-router-dom";

function AddContact() {
  const { addContact, updateContact } = useContacts();
  const navigate = useNavigate();
  const location = useLocation();
  const contactToEdit = location.state;

  const [name, setName] = useState(contactToEdit ? contactToEdit.name : "");
  const [email, setEmail] = useState(contactToEdit ? contactToEdit.email : "");
  const [phone, setPhone] = useState(contactToEdit ? contactToEdit.phone : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = { name, email, phone };
    if (contactToEdit) {
      updateContact(contactToEdit.id, contactData);
    } else {
      addContact(contactData);
    }
    navigate("/");
  };

  return (
    <div className="container mt-3">
      <h1>{contactToEdit ? "Editar Contacto" : "Agregar Contacto"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Guardar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={()=>navigate("/")}>Atrás</button>
      </form>
    </div>
  );
}

export default AddContact;