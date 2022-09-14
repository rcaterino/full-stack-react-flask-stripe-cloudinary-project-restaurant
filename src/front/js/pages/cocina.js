import React from "react";
import { NavbarAdmin } from "../component/navbarAdmin";
import { OrderInKitchen } from "../component/orderInKitchen";
import Alert from "react-bootstrap/Alert";

export const Cocina = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="container-fluid mt-3">
        <Alert variant="success">
          <Alert.Heading>
            Hey, este será un gran día, ¡vamos a divertirnos!
          </Alert.Heading>

          <hr />
          <h6 className="mb-0">
            Recuerda que todos nuestros clientes son igual de importantes, por
            favor, prepara los pedidos por orden de entrada
          </h6>
        </Alert>
        <OrderInKitchen />
      </div>
    </>
  );
};
