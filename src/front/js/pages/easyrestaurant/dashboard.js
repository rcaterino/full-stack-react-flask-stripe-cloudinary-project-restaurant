import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/easyrestaurant/dashboard.scss";
import { CarouselHome } from "../../component/easyrestaurant/carousel";
import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { LogInAdmin } from "../../component/easyrestaurant/login";

import { FooterEasy } from "../../component/easyrestaurant/footer";


export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  //let navigate = useNavigate();

  useEffect(() => {
    actions.getTokenFromSession();
    store.token;
  }, []);

  return (
    <>
      {!store.token ||
        store.token === null ||
        store.token === "" ||
        store.token === undefined ? (
        <LogInAdmin />
      ) : (
        <div className="bg-light">
          <NavbarAdmin />
          <CarouselHome />
          <div>
          
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Easy Restaurant</th>
                  <th scope="col">Tus pedidos</th>
                </tr>
              </thead>
              <tbody>
              {store.order.map((order) => (
                <tr>
                  <th scope="row">1</th>
                  <td>Pedido Número:{order.order_id}</td>
                </tr>
                ))}
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
            
          
          </div>
          <FooterEasy />

        </div>
      )}
    </>
  );
};
