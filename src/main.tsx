import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import UserProvider from "./context/UserContext.tsx";
import AuthUserProvider from "./context/authUserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthUserProvider>
          <App />
        </AuthUserProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
