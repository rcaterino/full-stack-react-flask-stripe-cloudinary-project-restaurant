import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import ScrollToTop from "./component/scrollToTop";
import { Footer } from "./component/footer";
import { SubirImages } from "./component/cloudinary";

import { Home } from "./pages/home";
import { QuienesSomos } from "./pages/QuienesSomos";
import { Miperfil } from "./pages/MiPerfil";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PaymantComplete } from "./pages/paymantcomplete";
import { Carrito } from "./pages/carrito";
import { Checkout } from "./pages/checkout";

import { EasyRestaurant } from "./pages/restaurant/easyrestaurante";
import { Cocina } from "./pages/restaurant/cocina";
import { Alergenos } from "./pages/restaurant/alergenos";
import { Ingredientes } from "./pages/restaurant/ingredientes";
import { Categorias } from "./pages/restaurant/categorias";
import { Productos } from "./pages/restaurant/productos";
import { Clientes } from "./pages/restaurant/clientes";
import { Correlativos } from "./pages/restaurant/correlativos";

import injectContext from "./store/appContext";
import { Checkout } from "./pages/checkout";
import { Allergens } from "./component/alergenos";

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
            <Route element={<Checkout />} path='/checkout' />
            <Route element={<Allergens />} path='/alergenos' />
            <Route element={<PaymantComplete />} path="/pagocompletado" />
            <Route element={<EasyRestaurant />} path="/easyrestaurant/admin" />
            <Route element={<Cocina />} path="/easyrestaurant/cocina" />
            <Route element={<Alergenos />} path="/easyrestaurant/alergenos" />
            <Route
              element={<Ingredientes />}
              path="/easyrestaurant/ingredientes"
            />
            <Route element={<Categorias />} path="/easyrestaurant/categorias" />
            <Route element={<Productos />} path="/easyrestaurant/productos" />
            <Route element={<Clientes />} path="/easyrestaurant/clientes" />
            <Route
              element={<Correlativos />}
              path="/easyrestaurant/correlativos"
            />
            <Route element={<SubirImages />} path="/Images" />

            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <a
            href="https://acortar.link/hp6ar1"
            className="float"
            target="_blank"
          >
            <i className="fa fa-whatsapp my-float"></i>
          </a>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
