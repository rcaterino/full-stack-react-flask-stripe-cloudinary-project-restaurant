import React from "react";
import { Link } from "react-router-dom";

export const NavbarCustomer = () => {
    return (


        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container">
                <a className="navbar-brand me-2" href="/">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                        height="16"
                        alt="MDB Logo"
                        loading="lazy"
                        style={{ mt: "-1px" }} />
                </a>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>



                <div className="collapse navbar-collapse" id="navbarButtonsExample">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/QuienesSomos"> Quienes somos</a>
                        </li>
                    </ul>


                    <div className="d-flex align-items-center">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/Miperfil">Mi Perfil</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/carrito">Carrito</a>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>

        </nav>


    );
};
