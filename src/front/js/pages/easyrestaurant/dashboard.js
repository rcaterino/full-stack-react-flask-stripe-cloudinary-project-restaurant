import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/easyrestaurant/dashboard.scss";

import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { LogInAdmin } from "../../component/easyrestaurant/login";
import { SidebarAdmin } from "../../component/easyrestaurant/sidebar";
import { FooterEasy } from "../../component/easyrestaurant/footer";

import { OrderInKitchen } from "../../component/easyrestaurant/orderInKitchen";
import { Ingredientes } from "./ingredientes";
import { Clientes } from "./clientes";
import { Alergenos } from "./alergenos";
import { Productos } from "./productos";

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
        <div className="dashboard">
          <NavbarAdmin />
          <div className="flex">
            <SidebarAdmin />
            <div className="content">inicio</div>
          </div>

          <FooterEasy />
        </div>
      )}
    </>
  );
};
