import React from "react";
import { Link } from "react-router-dom";

export const NavbarCustomer = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                <button className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarCenteredExample"
                    aria-controls="navbarCenteredExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>


                <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                    <ul className="navbar-nav mb-2 mb-lg-0">

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Portal 10</a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" href="/QuienesSomos"> Quienes somos</a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" href="/Miperfil">Mi perfil</a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" href="#">Carrito</a>
                        </li>
                    </ul>

                </div>

            </div>

        </nav>
    );
};