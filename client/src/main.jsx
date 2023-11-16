import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-oh1n6e032iflyamq.uk.auth0.com"
      clientId="9hmYtttmuJvsXCnWLYzc7L0GpDGiPWUK"
      authorizationParams={{
        redirect_uri: "https://game-project-psi.vercel.app/",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
