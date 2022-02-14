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
    useEffect(()=>{
      oktaAuth.session.exists().then((response) => {
      
        if(response || oktaAuth.isLoginRedirect()){
          oktaAuth.token.getWithoutPrompt({scopes:['openid','email','profile']}).then((response)=>{
            oktaAuth.tokenManager.setTokens(response.tokens);
            oktaAuth.tokenManager.getTokens()
              .then(({idToken }) => {
                setName(idToken.claims.name)
              });
          }).then(setAuthState(true))
          if(oktaAuth.isLoginRedirect())
            router.push({pathname: '/'})
        } else setAuthState(false)
      })
    },[])

    return (
        <AuthenticationContext.Provider value={[oktaAuth,authState,name]}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContext;