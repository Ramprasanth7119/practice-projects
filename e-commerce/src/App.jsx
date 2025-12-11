import Homepage from './Pages/Home/Homepage'
import './App.css';
import './index.css';
import Checkout from './Pages/Checkout/Checkout';
import {Routes, Route} from 'react-router';
import Orders from './Pages/Orders/Orders';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Tracking from './Pages/Tracking';

function App() {

    const [cart, setCart] = useState([]);

    const loadCart = async () =>{
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } 

     useEffect(()=>{
      loadCart();
    },[]);

  return (
    <Routes>
      <Route index element={<Homepage cart={cart} loadCart={loadCart}/>}/>
      <Route path='/checkout' element={<Checkout cart={cart} loadCart={loadCart}/>} />
      <Route path='/orders' element={<Orders cart={cart}/>} />
      <Route path='/tracking' element={<Tracking />}/>
    </Routes> 
  )
}

export default App
