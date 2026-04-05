import React from "react";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Contacts />} />
      <Route path="/add-contact" element={<AddContact />} />
    </Routes>
  );
}

export default App;