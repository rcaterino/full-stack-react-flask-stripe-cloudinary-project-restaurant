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
        <nav className="navbar navbar-dark sticky-top navbar-expand-lg">
          <div className="container-fluid">
            <div className="col-5">
              <Link to="/">
                <button className="button2">
                  <span className="box ">
                    Home
                  </span>
                </button>
              </Link>
            </div>
            <button className="navbar-toggler navbar-lg" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="col-9">
                <Link to="/login">
                  <button className="button2">
                    <span className="box ">
                      login
                    </span>
                  </button>
                </Link>
              </div>
              <div className="col-1">
                <Link to="/Carrito">
                  <button className="button2">
                    <span className="box">
                      <i className="fa-sharp fa-solid fa-cart-shopping"><span className="badge bg-success rounded-pill">{store.carrito.length}</span></i>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        /**Si el usuario está logeado, renderizamos el navbar con sus funcionalidades privadas y acceso a su página de perfil */
        <nav className="navbar navbar-dark sticky-top navbar-expand-lg">
          <div className="container">
            <div className="col-3">
            <Link to="/">
              <button className="button2">
                <span className="box">
                  Home
                </span>
              </button>
            </Link>
            </div>
            <button className="navbar-toggler navbar-lg" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" style={{color: "white"}}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="col-3">
                <Link to="/login">
                  <button className="button2">
                    <span className="box">
                      login
                    </span>
                  </button>
                </Link>
                </div>
                <div className="col-3">
                  <Link to="/miperfil">
                    <button className="button2">
                      <span className="box">
                        Mi Perfil
                      </span>
                    </button>
                  </Link>
                  </div>
                  <div className="col-3">
                  <Link to="/Carrito">
                    <button className="button2">
                      <span className="box">
                        <i className="fa-sharp fa-solid fa-cart-shopping"><span className="badge bg-success rounded-pill">{store.carrito.length}</span></i>
                      </span>
                    </button>
                  </Link>
                  </div>
                  <div className="col-3">
                  <button
                    className="button2"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <span className="box">
                      LogOut
                    </span>
                  </button>
                  </div>
            </div>
          </div>
        </nav>

        // <nav className="navbar navbar-dark " expand="lg" style={{ height: "110px" }}>
        //   <div className="container">
        //     <Link to="/">
        //       <button className="button2">
        //         <span className="box">
        //           Home
        //         </span>
        //       </button>
        //     </Link>
        //     <Link to="/miperfil">
        //       <button className="button2">
        //         <span className="box">
        //           Mi Perfil
        //         </span>
        //       </button>
        //     </Link>
        //     <Link to="/Carrito">
        //       <button className="button2 ">
        //         <span className="box">
        //           <i className="fa-sharp fa-solid fa-cart-shopping"></i>
        //         </span>
        //       </button>
        //     </Link>
        //     <div className="">
        //       <button
        //         className="button2"
        //         onClick={() => {
        //           handleLogout();
        //         }}
        //       >
        //         <span className="box">
        //           LogOut
        //         </span>
        //       </button>
        //     </div>
        //   </div>
        // </nav>
      )}
    </>
  );
};
