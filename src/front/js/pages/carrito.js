import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

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
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCarrito();
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
    <>
      <Navbar />
      <div className="container align-items-center">
        <div className="col m-auto">
          <div class="text-center">
            <h2>Cesta de Compra</h2>
            <p class="lead">
              el contenido de tu cesta de compra es el siguiente:
            </p>
          </div>

          <div class="row g-5">
            <div class="col-xs-4 md-8 col-lg-12  order-md-last">
              <h4 class=" justify-content-between mb-3">
                <span class="text-primary">tu Carrito</span>
                <span class="badge bg-primary rounded-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                {store.carrito.length > 0 &&
                  store.carrito.map((item, k) => {
                    return(
                    <>
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">{item.name}</h6>
                          <small class="text">{item.description}</small>
                        </div>
                        <span class="text">€ {item.price}</span>
                      </li>
                    </>)
                  })}

                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (EUR)</span>
                  <strong>$20</strong>
                </li>
              </ul>
              <hr class="my-4" />

              <h4 class="mb-3">Payment</h4>
            </div>
          </div>
        </div>
      </div>
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <div className="container align-item-center">
              <div className="col mt-3   ">
                <CheckOutForm />
              </div>
            </div>
          </Elements>
        )}
      </div>
    </>
  );
};
