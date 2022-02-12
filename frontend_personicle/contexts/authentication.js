import { createContext, useState,useEffect } from "react";
import { OktaAuth } from "@okta/okta-auth-js";
import config from '../pages/config';

const AuthenticationContext = createContext(0)

export const AuthenticationProvider = ({children}) => {
   
    const[name,setName] = useState(null);
    const [authState, setAuthState] = useState(false);
    const oktaAuth = new OktaAuth(config.oidc);
    const oktaAuthGoogle = new oktaAuth
   useEffect(() => {
     if(oktaAuth.isLoginRedirect()){
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