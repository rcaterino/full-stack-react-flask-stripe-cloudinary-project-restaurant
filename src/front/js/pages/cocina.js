import React from "react";
import { NavbarAdmin } from "../component/navbarAdmin";
import { OrderInKitchen } from "../component/orderInKitchen";

export const Cocina = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="container-fluid mt-3">
        <div className="alert alert-warning text-center" role="alert">
          Pedidos en preparación
        </div>
        <OrderInKitchen />
      </div>
    </>
  );
};
