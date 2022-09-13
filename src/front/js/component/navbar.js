import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  /**la función handleLogout llama la función logout dentro de actions en flux.js y redirige el usuario al home */
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  /** con useEffect llamamos a la función getTokenFromSession para saber si el usuario está logeado leyendo si existe token en el store */
  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    /* utilizando el operador ternario, evaluamos si la variable token dentro de store está vacía, nula o indefinida para renderizar el navbar solo con botón de home y login */
    /* en caso que si tenemos token guardado en la sesión, renderizamos navbar personalizado con home, Mi perfil y LogOut */
    <>
      {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">Home</span>
            </Link>
            <div className="ml-auto">
              <Link to="/login">
                <span className="navbar-brand mb-0 h1">Login</span>
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        /**Si el usuario está logeado, renderizamos el navbar con sus funcionalidades privadas y acceso a su página de perfil */
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">Home</span>
            </Link>
            <Link to="/miperfil">
              <span className="navbar-brand mb-0 h1">Mi perfil</span>
            </Link>
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
        </nav>
      )}
    </>
  );
};
