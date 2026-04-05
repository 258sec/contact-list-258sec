import React from "react";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";

function App() {
  return (
    
    <Routes>
      {/*Ruta a la pestaña principal */}
      <Route path="/" element={<Contacts />} />
            {/*Ruta al formulario para añadir contactos*/}
      <Route path="/add-contact" element={<AddContact />} />
    </Routes>
  );
}

export default App;