import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./api/context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import "../i18n/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ToastContainer
theme="dark"
position="top-right"
autoClose={2000}
closeOnClick
pauseOnHover={false}

/>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </Router>
);
