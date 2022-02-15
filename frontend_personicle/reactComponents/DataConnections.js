import { useSession } from "next-auth/client";
import Link from "next/link";
import AuthenticationContext from '../contexts/authentication';
import config from "../pages/config";
import React, {useContext, useEffect, useState} from "react";


export default function DataConnectionsDiv(props){
    
    const[oktaAuth,authState] = useContext(AuthenticationContext);
    const [authorized,setAuthorized] = useState(false)
    const [authenticated,setAuthenticated] = useState(false)

    const[sub,setSub] = useState(null)
    // useEffect(() => {
    //   const checkAuthentication = async() => {
    //     if(authState){
    //       const access_token = await oktaAuth.tokenManager.get('accessToken');
    //       const id_token = await oktaAuth.tokenManager.get('idToken');
    //       var url = +config.resourceServer.endpoint+"/fitbit/connection?user_id="+id_token.claims.sub
    //       setSub(id_token.claims.sub)
    //       await fetch(url, {
    //           headers: {
    //             Authorization: `Bearer ${access_token.accessToken}`,
    //             auth: authenticated,
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT"
    //           }
    //         }).then((response) => {
    //             if (!response.ok) {
    //               return Promise.reject();
    //             }
    //             return response.json();  
    //           }).then((data)=> { 
    //             console.log(data)       
    //               setAuthenticated(data.message)
    //           }).catch((err) => {
    //             console.error(err); 
    //           });
    //     }
    
       
    //   }
        
    // checkAuthentication();
    // })

    if(!authState){
      return("User not logged in!")
    }
 
    let connections = props.sources;
    let rows = [];
    for(let i=0; i<connections.length; i++){
        let connectionSource = connections[i]['source']
        let sourceIcon = connections[i]['icon']
        let redirectLink = connections[i]['redirect']+"?user_id="+sub
        let returnLink = connections[i]['return']
        // Use onclick request instead of link in the button
        // let row = [<td>{connections[i]['source']}</td>, <td><button ><Link href= {redirectLink+"?redirect_uri="+returnLink}>Connect</Link></button></td>];
        let row = [<td>{connections[i]['source']}</td>, <td><button onClick={(e) => authorizationWindow(e, redirectLink)}>Connect</button></td>];
        rows.push(<tr>{row}</tr>);
    }

    
async function authorizationWindow(e,redirectUrl){

  const access_token = await oktaAuth.tokenManager.get('accessToken');
  const id_token = await oktaAuth.tokenManager.get('idToken');

  setSub(id_token.claims.sub)
  var url = config.resourceServer.endpoint+"/fitbit/connection?user_id="+id_token.claims.sub
  // var url = config.resourceServer.endpoint+"/google-fit/connection?user_id="+id_token.claims.sub
  await fetch(url, {
    mode: 'cors',
      headers: {
        Authorization: `Bearer ${access_token.accessToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ['GET','POST','OPTIONS']
      }
    }).then((response) => {
    //   if (response.redirected) {
        // window.location.href = response.url;
    // }
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();  
      }).then((data)=> {    
       console.log(data)
        
        // window.location.href = data
          // setAuthorized(data.message)
        
      }).catch((err) => {
        console.error(err); 
      });

      // await fetch(url, {
      //   headers: {
      //     Authorization: `Bearer ${access_token.accessToken}`,
      //     auth: authenticated,
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': ['GET','POST','OPTIONS']
      //   }
      // }).then((response) => {
      //     if (!response.ok) {
      //       return Promise.reject();
      //     }
      //     return response.json();  
      //   }).then((data)=> {        
      //       setAuthorized(data.message)
      //       console.log(data)
      //   }).catch((err) => {
      //     console.error(err); 
      //   })
      // if(authorized){
      //   console.log("Authorized")
      //   let new_window = window.open(redirectUrl);
      //   // new_window.close();
      //   // const res = new_window.redirect(redirectUrl);
      //   // console.log(res);
      //   // if(res.data.success){
      //   //   new_window.close()
      //   // }
      // } else {
      //   console.log("Unauthorized")
      // }
  
}


    return(
        <div className="container">
        <div className="row">
          <div className="col s12 board">
            <table id="data-connections">
               <tbody>
                 {rows}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    );

}
