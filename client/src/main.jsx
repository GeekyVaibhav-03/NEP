import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./tailwind.css";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
