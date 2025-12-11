
import Products from "./Products";

export function ProductGrid({products, loadCart}){

    return(
        <div className="products-grid">
        {products.map((product)=>(
          <Products key={product.id} product={product} loadCart={loadCart}/>
        ))}
        </div>
    )
}