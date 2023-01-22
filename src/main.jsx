import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./api/context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import "../i18n/i18n";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>

    <App />
    </AuthProvider>
  </Router>
);
