import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function DataConnection(){
    const[session, loading] = useSession();
    const[content, setContent] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch("/api/data-connections");
            // the api call returns the list of api connections and the active connections for a user
            // for every connection there should be 2 buttons: connect, and disconnect
            
            const json = await res.json();

            if(json.content){
                setContent(json.content)
            }
        }
        fetchData();
    }, [session]);

    if( typeof window !== "undefined" && loading) return null;

    if (!session){
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
                    {content}
                </p>
            </div>
        </main>
    )

}