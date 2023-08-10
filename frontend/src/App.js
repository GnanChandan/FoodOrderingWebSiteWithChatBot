import { BrowserRouter,Routes,Route } from "react-router-dom";
import SharedLayout from './components/sharedLayout'
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { useEffect, useState } from "react";

function App()
{
  const [uid,setUid] = useState('');
  console.log(`${uid} from home`)
  useEffect(()=>{
    if (localStorage.getItem('uid') !== null && localStorage.getItem('uid') !== '')
    {
      setUid(localStorage.getItem('uid'));
    }
  },[])
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout uid={uid}/>}>
            <Route index element={<Home uid={uid}/>}/>
            <Route path="about_us" element={<About/>}/>
            <Route path="cart" element={<Cart uid={uid}/>}/>
            <Route path="login" element={<Login setUid={setUid}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;