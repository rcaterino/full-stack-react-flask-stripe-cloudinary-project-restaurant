import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Menu } from "../component/menu";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <h1 className="text-center">Bienvenido a Portal 10</h1>
      <div className="bodyMenu">
        <Menu />
      </div>
      <Footer />
    </div>
  );
};
