import { getSession } from "next-auth/client";

const userConnections = [
    {
        'source': 'FitBit',
        'icon': '',
        'redirect': 'http://localhost:5000/fitbitConnection'
        // process.env.AUTH_SERVER + ':' + process.env.AUTH_PORT + process.env.FITBIT_AUTH_ENDPOINT
    },
    {
        'source': 'Oura',
        'icon': '',
        'redirect': '/'
    }
]

export default async (req,res) => {
    const session = await getSession({req});

    if(session){
        const userEmail = session.user.email;


        res.send({
            content: 
                <DataConnectionsDiv sources={userConnections}/>
        });
    } else{
        res.send({
            error: "You need to be logged in"
        });
    }
}

function DataConnectionsDiv(props){
    connections = props.sources;
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