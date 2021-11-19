import { useSession } from "next-auth/client";
import Link from "next/link";

export default function FitbitConnection(){
    const [session, loading] = useSession();
    
    if(!session){
        return(
            <main>
            <div>
                <h1> You aren't logged in. Please log in</h1>
            </div>
        </main>

        )
    }

    let userEmail = session.user.email;

    // Fetch users connection status using email
    // testing rendering using hardcoded connections object
    // console.log(process.env)
    let userConnections = [
        {
            'source': 'FitBit',
            'icon': '',
            'redirect': 'http://localhost:5000/fitbitConnection',
            'return': 'http://localhost:300/testPage'
            // process.env.AUTH_SERVER + ':' + process.env.AUTH_PORT + process.env.FITBIT_AUTH_ENDPOINT
        },
        {
            'source': 'Oura',
            'icon': '',
            'redirect': '/',
            'return': 'http://localhost:300/testPage'
        }
    ]
    // display their current connections and the buttons for connect/disconnect data source

    return(
        <main>
            <div>
                <h1>Data Connections for {userEmail}</h1>
            </div>
            {DataButton(userConnections)}
        </main>
    )
}

function DataButton(connections=[]){
    let rows = [];
    for(let i=0; i<connections.length; i++){
        let connectionSource = connections[i]['source']
        let sourceIcon = connections[i]['icon']
        let redirectLink = connections[i]['redirect']
        let row = [<td>{connections[i]['source']}</td>, <td><button ><Link href= {redirectLink}>Connect</Link></button></td>];
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