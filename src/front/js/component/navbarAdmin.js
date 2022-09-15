import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const NavbarAdmin = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  /**la función handleLogout llama la función logout dentro de actions en flux.js y redirige el usuario al home */
  const handleLogout = () => {
    actions.logoutRestaurant();
    navigate("/easyrestaurant/admin");
  };

  /** con useEffect llamamos a la función getTokenFromSession para saber si el usuario está logeado leyendo si existe token en el store */
  useEffect(() => {
    store.restaurant_data;
  }, []);

  return (
    <nav className="navbar navbar-expand-lg text-white bg-danger">
      <div className="container-fluid text-white">
        <a className="navbar-brand text-white" href="#">
          Easy Restaurant
        </a>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div className="collapse navbar-collapse text-white" id="navbarNavDropdown">
          <ul className="navbar-nav text-white">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item text-white">
              <a className="nav-link text-white" href="#">
                Features
              </a>
            </li>
            <li className="nav-item text-white">
              <a className="nav-link text-white" href="#">
                Pricing
              </a>
            </li>
          </ul>
          <div className="ml-auto">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleLogout();
                }}
              >
                LogOut
              </button>
              </div>
        </div>
        
      </div>
    </nav>
  );
};
