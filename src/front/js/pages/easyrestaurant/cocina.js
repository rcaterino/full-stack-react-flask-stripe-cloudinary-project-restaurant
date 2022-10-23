import React from "react";
import { OrderInKitchen } from "../../component/easyrestaurant/orderInKitchen";
import Alert from "react-bootstrap/Alert";
import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { SidebarAdmin } from "../../component/easyrestaurant/sidebar";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import '../../../styles/easyrestaurant/dashboard.scss'
export const Cocina = () => {
  return (
    <>
      <div className="dashboard">
        <NavbarAdmin />
        <div className="flex">
          <SidebarAdmin />
          <div className="content">
            
              <Alert variant="success">
                <Alert.Heading>
                  Hey, este será un gran día, ¡vamos a divertirnos!
                </Alert.Heading>

                <hr />
                <h6 className="mb-0">
                  Recuerda que todos nuestros clientes son igual de importantes,
                  por favor, prepara los pedidos por orden de entrada
                </h6>
              </Alert>
              <OrderInKitchen />
            
          </div>
        </div>

        <FooterEasy />
      </div>
    </>
  );
};
