import React from "react";

import Alert from "react-bootstrap/Alert";

import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import { OrderInKitchen } from "../../component/easyrestaurant/orderInKitchen";

export const Cocina = () => {
  return (
    <>
      <div className="bg-light" style={{height: "100vh"}}>
        <NavbarAdmin />
        <div className="col-10 m-auto pt-3">
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
        </div>

        <OrderInKitchen />
        <FooterEasy />
      </div>
    </>
  );
};
