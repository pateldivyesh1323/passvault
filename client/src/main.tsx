import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";
import enviroment from './enviroment.ts';
import { UserAuthProvider } from './providers/UserAuthProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={enviroment.auth_domain}
        clientId={enviroment.auth_clientid}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: enviroment.api_identifier
        }}
      >
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
