import Header from '../../Components/Header';
import './Orders.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderGrid from './OrderGrid'

const Orders = ({cart}) => {

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
   
    const getOrders = async () =>{
      const response = await axios.get("/api/orders?expand=products")
        setOrders(response.data);
    }

    getOrders();
  },[])


  return (
    <>
        <Header cart={cart}/>

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <OrderGrid orders={orders}/>
      
    </div>
    </>
  )
}

export default Orders