import { formatPrice } from "../../utils/FormatPrice";
import dayjs from "dayjs";
import { Link } from "react-router";

const OrderGrid = ({orders}) => {
  return (
    <div className="orders-grid">
        {orders.map((order)=>{
          return(
          <div key={order.id} className="order-container">

            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format("MMMM, DD")}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{formatPrice(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>
            <div className="order-details-grid">
            {order.products.map((item)=>{
              return(
                <>
                <div className="product-image-container">
                  <img src={item.product.image} />
                </div>

                <div className="product-details">
                  <div className="product-name">
                    {item.product.name}
                  </div>
                  <div className="product-delivery-date">
                    Arriving on: {dayjs(item.estimatedDeliveryTimeMs).format("MMMM DD")}
                  </div>
                  <div className="product-quantity">
                    Quantity: {item.quantity}
                  </div>
                  <button className="buy-again-button button-primary">
                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                    <span className="buy-again-message">Add to Cart</span>
                  </button>
                </div>

                <div className="product-actions">
                  <Link to="/tracking">
                    <button className="track-package-button button-secondary">
                      Track package
                    </button>
                  </Link>
                </div>
                </>
              )
            })}
            </div>
          </div>
          )
        })}
      </div>
  )
}

export default OrderGrid