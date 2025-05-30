import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./Components/context/context-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  </AuthProvider>
);
