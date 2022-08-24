import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Customer } from "./pages/customer";
import { Single } from "./pages/single";
import { Carrito } from "./pages/carrito";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Menú } from "./component/menú";
import { Miperfil } from "./pages/MiPerfil";
import { QuienesSomos } from "./pages/QuienesSomos";
import { Navbar } from "./component/navbar";


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
                        <Route element={<Customer />} path="/customer" />
                        <Route element={<Miperfil />} path="/Miperfil" />
                        <Route element={<QuienesSomos />} path="/QuienesSomos" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Carrito />} path="/carrito" />
                        <Route element={<Menú />} path="/menú" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
