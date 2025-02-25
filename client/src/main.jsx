import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./routes/router.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/* react-hot-toast */}
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
