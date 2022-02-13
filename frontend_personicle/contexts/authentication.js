import { createContext, useState,useEffect } from "react";
import { OktaAuth } from "@okta/okta-auth-js";
import config from '../pages/config';
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";

const AuthenticationContext = createContext(0)

export const AuthenticationProvider = ({children}) => {
    

    const[name,setName] = useState(null);
    const [authState, setAuthState] = useState(false);
    const oktaAuth = new OktaAuth(config.oidc);
   
    const router = useRouter()

 
   useEffect(() => {
     if(oktaAuth.isLoginRedirect()){
       console.log("login redirect")
       oktaAuth.token.parseFromUrl()
       .then(function(res){
         var tokens = res.tokens;
         console.log(tokens)
         oktaAuth.tokenManager.setTokens(tokens)
       }).then(oktaAuth.tokenManager.getTokens().then(({idToken}) => {
         if(idToken !== undefined){
           setName(idToken.claims.name)
         }
       })).then(setAuthState(true))
       
     } else {
       oktaAuth.session.exists().then((response)=>{
       
         if(response) {
          // console.log("session exists")
          console.log(response.tokens)
           setAuthState(true);
           oktaAuth.token.getWithoutPrompt({scopes: ['openid','email','profile']}).then((response) => {
              oktaAuth.tokenManager.setTokens(response.tokens);
              oktaAuth.tokenManager.getTokens()
              .then(({idToken }) => {
                setName(idToken.claims.name)
              });
           });
         }
         else setAuthState(false)
       })
     }
   });
    return (

        <AuthenticationContext.Provider value={[oktaAuth,authState,name]}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContext;