import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckOutForm from "../component/checkoutform.js";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LiMLsEvrZASLd3xkRkKXzOoUPeH81Nw4G9NSiMoqL7vMmLrGxeW1CF7O3Vjy6pNuQ4yP5TONun6VUSkI2DpseQ000UVZkU15a"
);

export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(process.env.BACKEND_URL + "/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [...store.carrito],
        metadata: {
          order_id: store.order_id,
          user_id: store.user_data["id"],
        },
      }),
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

  return (
    <div className="Checkout">
      <Navbar />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <div className="container align-item-center">
            <div className="col mt-3   ">
              <CheckOutForm />
            </div>
          </div>
        </Elements>
      )}
      <Footer />
    </div>
  );
};
