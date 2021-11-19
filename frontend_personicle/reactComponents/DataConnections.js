import { getSession } from "next-auth/client";
import Link from "next/link";

const delay = async (ms) => new Promise(res => setTimeout(res, ms));

export default function DataConnectionsDiv(props){
    let connections = props.sources;
    let rows = [];
    for(let i=0; i<connections.length; i++){
        let connectionSource = connections[i]['source']
        let sourceIcon = connections[i]['icon']
        let redirectLink = connections[i]['redirect']
        let returnLink = connections[i]['return']
        // Use onclick request instead of link in the button
        // let row = [<td>{connections[i]['source']}</td>, <td><button ><Link href= {redirectLink+"?redirect_uri="+returnLink}>Connect</Link></button></td>];
        let row = [<td>{connections[i]['source']}</td>, <td><button onClick={(e) => authorizationWindow(e)}>Connect</button></td>];
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

function authorizationWindow(e){
  let new_window = window.open("/popupPage");
  setTimeout(() => new_window.close(), 5000);
  // return("Testing pop up");
}