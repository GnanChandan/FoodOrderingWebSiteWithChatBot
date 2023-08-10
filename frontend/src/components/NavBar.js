import { Link } from "react-router-dom"
import '../styles/styles.css'
import { auth } from "../firebase-config"
import {signOut} from 'firebase/auth'
function NavBar({uid})
{
    const logout = async ()=>{
        localStorage.setItem('uid','');
        await signOut(auth);
        window.location.pathname = "/";
    }
    return (
        <nav className="flex gap-4 p-2 bg-gray-700 justify-between items-center">
            <Link to="/" className="text-white text-4xl p-5">Mira Foods</Link>
            <ul className="flex p-0 list-none gap-5 mr-3">
                <li>
                    <Link to="/" className="text-white hover:text-gray-500 text-3xl">Menu</Link>
                </li>
                <li> 
                    <Link to="/about_us" className="text-white hover:text-gray-500 text-3xl">About Us</Link>
                </li>
                <li>
                    <a href="/#location" className="text-white hover:text-gray-500 text-3xl">Location</a>
                </li>
                <li>
                    <Link to="/cart" className="text-white hover:text-gray-500 text-3xl">My Cart</Link>
                </li>
                <li>
                   {
                        uid.length === 0? <Link to="/Login" className="text-white hover:text-gray-500 text-3xl">Login</Link>
                        :
                        <Link to="/" className="text-white hover:text-gray-500 text-3xl" onClick={logout}>Logout</Link>
                   }
                </li>
            </ul>
        </nav>
    )
}

export default NavBar