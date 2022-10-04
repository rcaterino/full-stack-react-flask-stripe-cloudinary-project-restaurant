import React, { useEffect, useContext, useState } from "react";
import { OrderDetail } from "../component/clientOrder";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";


export const PaymantComplete = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTokenFromSession();
    actions.getUserDataFromSession();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Muchas gracias por su compra</h1>
      <OrderDetail />
    </>
  );
};
