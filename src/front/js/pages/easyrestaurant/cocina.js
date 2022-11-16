import React from "react";

import Alert from "react-bootstrap/Alert";
import { OrderInKitchen } from "../../component/easyrestaurant/orderInKitchen";
import { FooterEasy } from "../../component/easyrestaurant/footer";

export const Cocina = () => {
  return (
    <div className="align-items-center">
      <Alert variant="success">
        <Alert.Heading>
          Hey, este será un gran día, ¡vamos a divertirnos!
        </Alert.Heading>

        <hr />
        <h6>
          Recuerda que todos nuestros clientes son igual de importantes, por
          favor, prepara los pedidos por orden de entrada
        </h6>
      </Alert>

      <OrderInKitchen />
    </div>
  );
};
