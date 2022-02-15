import '../styles/globals.css'
import React from "react";
import config from './config';
import { AuthenticationProvider } from '../contexts/authentication';

function MyApp({ Component, pageProps }) {
  
  return (
    <AuthenticationProvider> 
      <Component {...pageProps} />
    </AuthenticationProvider>
  );
}

export default MyApp;
