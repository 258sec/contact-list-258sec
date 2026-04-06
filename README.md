# 📇 Contact List - 258sec

Aplicación web de gestión de contactos desarrollada con **React**. Permite crear, editar, visualizar y eliminar contactos conectándose a una API externa.

---

## 🚀 Funcionalidades

* 📋 Mostrar lista de contactos desde la API
* ➕ Crear nuevos contactos
* ✏️ Editar contactos existentes
* 🗑️ Eliminar contactos
* 🔄 Actualización automática tras cada acción

---

## 🛠️ Tecnologías utilizadas

* React
* React Router DOM
* Context API + useReducer
* Bootstrap 5
* Vite

---

## 📁 Estructura del proyecto

```
src/
│
├── Componentes/
│   └── ContactCard.jsx
│
├── context/
│   └── ContactContext.jsx
│
├── pages/
│   ├── Contacts.jsx
│   └── AddContact.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🧠 Funcionamiento

La aplicación utiliza **Context API** junto con `useReducer` para gestionar el estado global de los contactos.

* `ContactContext.jsx` → Maneja toda la lógica (fetch, crear, borrar, actualizar)
* `Contacts.jsx` → Carga y muestra la lista de contactos
* `ContactCard.jsx` → Representa cada contacto individual
* `AddContact.jsx` → Formulario reutilizable para crear y editar

---

## 🔗 API utilizada

```
https://playground.4geeks.com/contact/agendas/258sec/contacts
```

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/258sec/contact-list-258sec.git
```

2. Entrar en el proyecto:

```bash
cd contact-list-258sec
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar la aplicación:

```bash
npm run dev
```

5. Abrir en el navegador:

```
http://localhost:5173
```

---

## 👨‍💻 Autor

258sec
