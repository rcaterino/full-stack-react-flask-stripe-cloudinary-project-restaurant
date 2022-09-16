import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckOutForm from "../component/checkoutform.js";
import "../../styles/carrito.css";
import { Navbar } from "../component/navbar.js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LiMLsEvrZASLd3xkRkKXzOoUPeH81Nw4G9NSiMoqL7vMmLrGxeW1CF7O3Vjy6pNuQ4yP5TONun6VUSkI2DpseQ000UVZkU15a"
);

export const Carrito = () => {
  const [clientSecret, setClientSecret] = useState("");
  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(process.env.BACKEND_URL + "/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
      console.log(clientSecret);
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const deleteClick = (storeId) => {
    actions.deleteCarritoItem(storeId);
  };

  const deleteCarrito = () => {
    actions.deleteCarrito();
  };

  return (
    <div className="App">
      <Navbar />
      <div
        className="text-center mt-5 d-flex overflow-scroll"
        style={{ overflow: "auto", whiteSpace: "nowrap" }}
      >
        <></>
      </div>
      <>
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckOutForm />
            </Elements>
          )}
        </div>
      </>
    </div>
  );
};
