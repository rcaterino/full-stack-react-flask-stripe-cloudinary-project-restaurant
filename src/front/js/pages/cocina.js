import React from "react";
import { NavbarAdmin } from "../component/navbarAdmin";
import OrderInKitchen from "../component/orderInKitchen";

export const Cocina = () => {

  return (
    <>
    <NavbarAdmin/>
    <div className="container mt-3">
      <div className="alert alert-warning" role="alert">
        Pedidos en preparación
      </div>
      <OrderInKitchen />
    </div>
    </>
    
  );
};
