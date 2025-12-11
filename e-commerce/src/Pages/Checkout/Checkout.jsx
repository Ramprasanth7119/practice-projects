import { Link } from "react-router";
import "./Checkout.css";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

const Checkout = ({cart, loadCart}) => {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);

  useEffect(()=>{
    
    const getDeliveryOption = async () => {
      const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
          setDeliveryOptions(response.data);
    }

    const getPaymentSummary = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data)
    }

    getDeliveryOption();
    getPaymentSummary();
  },[cart])

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
              <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>

              <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
};

export default Checkout;
