import { useSession } from "next-auth/client";
import Link from "next/link";
import AuthenticationContext from '../contexts/authentication';

import React, {useContext} from "react";

async function authenticateUser(oktaAuth,authState,redirectLink){
  // call the resource server to authenticate the accesstoken only if user is authenticated
  if(authState){
    const access_token = await oktaAuth.tokenManager.get('accessToken');
    console.log(access_token)
    fetch(redirectLink, {
        headers: {
          Authorization: `Bearer ${access_token.accessToken}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT"
        }
      }).then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();  
        }).then((data)=> {
          return data;
          // const result = data.messages.map((message)=> {
          //   console.log(message.text)
          //   return {
          //     test: message.text
          //   }
          // })
        }).catch((err) => {
          console.error(err);
        });
  }
}
export default function DataConnectionsDiv(props){
    // const [session, status] = useSession();
    const[oktaAuth,authState] = useContext(AuthenticationContext);
    
    if(!authState){
      return("User not logged in!")
    }
    let connections = props.sources;
    let rows = [];
    for(let i=0; i<connections.length; i++){
        let connectionSource = connections[i]['source']
        let sourceIcon = connections[i]['icon']
        let redirectLink = connections[i]['redirect']
        let returnLink = connections[i]['return']
        // Use onclick request instead of link in the button
        // let row = [<td>{connections[i]['source']}</td>, <td><button ><Link href= {redirectLink+"?redirect_uri="+returnLink}>Connect</Link></button></td>];
        let row = [<td>{connections[i]['source']}</td>, <td><button onClick={(e) => authenticateUser(oktaAuth,authState, redirectLink)}>Connect</button></td>];
        rows.push(<tr>{row}</tr>);
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

function authorizationWindow(e, redirectUrl){
  let new_window = window.open(redirectUrl);
  // new_window.close();
  // const res = new_window.redirect(redirectUrl);
  // console.log(res);
  // if(res.data.success){
  //   new_window.close()
  // }
}