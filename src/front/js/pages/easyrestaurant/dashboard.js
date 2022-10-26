import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/easyrestaurant/dashboard.scss";

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
          

          <FooterEasy />
        </div>
      )}
    </>
  );
};
