import { getSession } from "next-auth/client";

export default async (req,res) => {
    const session = await getSession({req});

    if(session){
        const userEmail = session.user.email;


        res.send({
            content: "Welcome to the personicle page, " + userEmail
        });
    } else{
        res.send({
            error: "You need to be logged in"
        });
    }
}