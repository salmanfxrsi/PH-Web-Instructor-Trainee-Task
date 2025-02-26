import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router.jsx";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        {/* react-hot-toast */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "linear-gradient(to bottom left, #8b5cf6, #d946ef)",
              color: "#ffffff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "",
                secondary: "white",
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
