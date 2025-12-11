import axios from 'axios';
import Header from '../../Components/Header'
import { useEffect, useState } from 'react'
import { ProductGrid } from './ProductGrids';

const Homepage = ({cart, loadCart}) => {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
      const getProducts = async () =>{
        const response = await axios.get("/api/products")
        setProducts(response.data);
      }
      getProducts();
    },[]);

  return (
    <>
    <Header cart={cart}/>

    <div className="home-page">
      <ProductGrid products={products} loadCart={loadCart}/>
    </div>
    </>
  )
}

export default Homepage