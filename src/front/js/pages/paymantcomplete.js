import React, { useEffect, useContext, useState } from "react";
import { OrderDetail } from "../component/clientOrder";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const PaymantComplete = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTokenFromSession();
    actions.getUserDataFromSession();
    actions.getClientOrders(store.order_id);
  }, []);

  return (
    <div className="PagoCompleto">
      <Navbar />
      <div className="text-center">
        <h1 className="Letra">Muchas gracias por su compra</h1>
      </div>
      <OrderDetail />
      <Footer />
    </div>
  );
};
