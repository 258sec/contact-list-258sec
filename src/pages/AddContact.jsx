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
  //variable para acumular los errores de los inputs
  const [errors, setErrors] = useState({});


  //checkeamos los campos vacios, incompletos o incorrectos
  const validate = () => {
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "El nombre no puede estar vacío.";
    } else if (name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      newErrors.email = "El email no puede estar vacío.";
    } else if (!emailCheck.test(email)) {
      newErrors.email = "El email no es válido. Ejemplo: nombre@correo.com";
    }

    const phoneCheck = /^\+?[0-9]{7,15}$/;
    if (phone.trim() === "") {
      newErrors.phone = "El teléfono no puede estar vacío.";
    } else if (!phoneCheck.test(phone)) {
      newErrors.phone = "El teléfono solo puede contener números (7-15 dígitos).";
    }

    return newErrors;
  };


  // 👇 UN SOLO handleSubmit, el correcto con validación
  const handleSubmit = (e) => {
    //evitamos que recargue el navegador por defecto 
    e.preventDefault();
    const foundErrors = validate();
    //si hay errores se actualiza errors y salta el return (no avanza)
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    //si no hay errores enviamos los datos
    setErrors({});
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

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <button type="submit" className="btn btn-success">Guardar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
          Atrás
        </button>

      </form>
    </div>
  );
}

export default AddContact;