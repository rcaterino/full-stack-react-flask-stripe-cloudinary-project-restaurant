import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { QuienesSomos } from "./pages/QuienesSomos";
import { Miperfil } from "./pages/MiPerfil";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Cocina } from "./pages/cocina";
import { Carrito } from "./pages/carrito";
import { EasyRestaurant } from "./pages/easyrestaurante";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Miperfil />} path="/miperfil" />
            <Route element={<QuienesSomos />} path="/quienessomos" />
            <Route element={<Carrito />} path="/Carrito" />

            <Route element={<EasyRestaurant />} path="/easyrestaurant/admin" />
            <Route element={<Cocina />} path="/easyrestaurant/cocina" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
