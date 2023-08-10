import { Outlet } from "react-router-dom";
import ChatBot from "./ChatBot";
import NavBar from "./NavBar";

function SharedLayout({uid})
{
    return (
        <>
            <NavBar uid={uid}/>
            <ChatBot uid={uid}/>
            <Outlet/>
        </>
    )
}

export default SharedLayout;