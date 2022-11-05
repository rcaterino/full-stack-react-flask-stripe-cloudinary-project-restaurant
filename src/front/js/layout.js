import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./component/scrollToTop";
import { SubirImages } from "./component/cloudinary";
import { Allergens } from "./component/alergenos";

import { Home } from "./pages/home";
import { QuienesSomos } from "./pages/QuienesSomos";
import { Miperfil } from "./pages/MiPerfil";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PaymantComplete } from "./pages/paymantcomplete";
import { Carrito } from "./pages/carrito";
import { Checkout } from "./pages/checkout";

import { Cocina } from "./pages/easyrestaurant/cocina";
import { Alergenos } from "./pages/easyrestaurant/alergenos";
import { Ingredientes } from "./pages/easyrestaurant/ingredientes";
import { Categorias } from "./pages/easyrestaurant/categorias";
import { Productos } from "./pages/easyrestaurant/productos";
import { Clientes } from "./pages/easyrestaurant/clientes";
import { Correlativos } from "./pages/easyrestaurant/correlativos";
import { HomeEasyRest } from "./pages/easyrestaurant/home";
import { Dashboard } from "./pages/easyrestaurant/dashboard";

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
            // FUNCIONALIDAD CLIENTE EASY RESTAURANT
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Miperfil />} path="/miperfil" />
            <Route element={<QuienesSomos />} path="/quienessomos" />
            <Route element={<Carrito />} path="/Carrito" />
            <Route element={<Checkout />} path="/checkout" />
            <Route element={<Allergens />} path="/alergenos" />
            <Route element={<PaymantComplete />} path="/pagocompletado" />
            // EASY RESTAURANT
            <Route element={<HomeEasyRest />} path="/home" />
            <Route element={<Dashboard />} path="/portal10/" />
            <Route element={<Cocina />} path="/portal10/cocina" />
            <Route element={<Alergenos />} path="/portal10/alergenos" />
            <Route element={<Ingredientes />} path="/portal10/ingredientes" />
            <Route element={<Categorias />} path="/portal10/categorias" />
            <Route element={<Productos />} path="/portal10/productos" />
            <Route element={<Clientes />} path="/portal10/clientes" />
            <Route element={<Correlativos />} path="/portal10/correlativos" />
            <Route element={<SubirImages />} path="/Images" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          {/* <a
            href="https://acortar.link/hp6ar1"
            className="float"
            target="_blank"
          >
            <i className="fa fa-whatsapp my-float"></i>
          </a> */}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
