import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Menu } from "../component/menu";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { CarouselHome } from "../component/carouselCliente";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    <div className="home">
      <Navbar />
       <h1 className="Letra text-center">Bienvenido a Portal 10</h1> 
      {/* <CarouselHome /> */}
      <div className="bodyMenu">
        <Menu />
      </div>
      <Footer />
    </div>
  );
};
