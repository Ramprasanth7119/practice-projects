import dayjs from "dayjs";
import axios from 'axios';
import { formatPrice } from "../../utils/FormatPrice";

const OrderSummary = ({deliveryOptions, cart, loadCart}) => {
  return (
      <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((item) => {

              let selectedDeliveryOption = deliveryOptions.find((deliveryOption)=>{
                return deliveryOption.id === item.deliveryOptionId;
              })

              const handleDeleteOrder = async () =>{
                await axios.delete(`/api/cart-items/${item.productId}`);
                await loadCart();
              }

              return (
                <div key={item.id} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM d")}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={item.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {item.product.name}
                      </div>
                      <div className="product-price">{formatPrice(item.product.priceCents)}</div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{item.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary" onClick={handleDeleteOrder}>
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((delivery)=>{

                        let priceString = 'Free Shipping';
                        if(delivery.priceCents > 0) priceString = `${formatPrice(delivery.priceCents)} - shipping`

                        const handleOptionUpdate = async () =>{
                            await axios.put(`/api/cart-items/${item.productId}`,{
                            deliveryOptionId: delivery.id
                          })
                          await loadCart();
                        }

                        return(
                      <div key={delivery.id} className="delivery-option" onClick={handleOptionUpdate}>
                        <input
                          type="radio"
                          checked={delivery.id === item.deliveryOptionId}
                          onChange={() => {}}
                          className="delivery-option-input"
                          name={`delivery-option-${item.productId}`}
                        />
                        <div>
                          <div className="delivery-option-date">
                            {dayjs(delivery.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                          </div>
                          <div className="delivery-option-price">
                            {priceString}
                          </div>
                        </div>
                      </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
  )
}

export default OrderSummary