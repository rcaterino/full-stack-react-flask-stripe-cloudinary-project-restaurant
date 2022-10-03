import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";

export const PaymantComplete = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTokenFromSession();
    actions.getUserDataFromSession();
  }, []);

  console.log("user data al finalizar compra");
  console.log(store.user_data);
  console.log("user address al finalizar compra");
  console.log(store.user_address);
  console.log("user allergens al finalizar compra");
  console.log(store.user_allergens);
  console.log("order id");
  console.log(store.order_id);
  function getOrderInProcess() {
    actions.getClientOrders(store.order_id);
    console.log("datos del pedido en proceso:");
    console.log(store.order_detail);
  }
  
  

  return (
    <>
      <Navbar />
      <h1>Muchas gracias por su compra</h1>
      <button onClick={getOrderInProcess}>Optener datos del pedido en curso</button>
    </>
  );
};
