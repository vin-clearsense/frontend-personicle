import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import AuthenticationContext from "../contexts/authentication";
import  {useContext} from "react";
export default function DataConnection(){
    const[oktaAuth,authState,name]= useContext(AuthenticationContext);
    // const[session, loading] = useSession();
    const[content, setContent] = useState();

    // useEffect(() => {
    //     const fetchData = async() => {
    //         const res = await fetch("/api/data-connections");
    //         // the api call returns the list of api connections and the active connections for a user
    //         // for every connection there should be 2 buttons: connect, and disconnect
            
    //         const json = await res.json();

    //         if(json.content){
    //             setContent(json.content)
    //         }
    //     }
    //     fetchData();
    // });

    // if( typeof window !== "undefined" ) return null;

    if (!authState){
        return (
            <main>
                <div>
                    <h1> You aren't logged in. Please log in</h1>
                </div>
            </main>
        )
    }

    return(
        <main>
            <div>
                <h1>Protected Page</h1>
                <p>
                    {"Welcome to Personicle, " + name}
                </p>
            </div>
        </main>
    )

}