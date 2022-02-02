import { useSession } from "next-auth/client";
import Link from "next/link";

export default function DataConnectionsDiv(props){
    const [session, status] = useSession();
    if(!session){
      return("User not logged in!")
    }
    let connections = props.sources;
    let rows = [];
    for(let i=0; i<connections.length; i++){
        let connectionSource = connections[i]['source']
        let sourceIcon = connections[i]['icon']
        let redirectLink = connections[i]['redirect']+"?user_id="+session.user.email
        let returnLink = connections[i]['return']
        // Use onclick request instead of link in the button
        // let row = [<td>{connections[i]['source']}</td>, <td><button ><Link href= {redirectLink+"?redirect_uri="+returnLink}>Connect</Link></button></td>];
        let row = [<td>{connections[i]['source']}</td>, <td><button onClick={(e) => authorizationWindow(e, redirectLink)}>Connect</button></td>];
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