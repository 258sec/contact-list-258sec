// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContactProvider>
      <App />
    </ContactProvider>
  </BrowserRouter>
);