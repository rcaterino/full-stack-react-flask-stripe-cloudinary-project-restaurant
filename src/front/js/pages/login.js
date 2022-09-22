import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    actions.login(email, password);
    navigate("/");
  };

  return (
    /* utilizando el operador ternario, evaluamos si la variable token dentro de store está vacía, nula o indefinida para renderizar el componente de login /
    /* en caso que si tenemos token guardado en la sesión, renderizamos el mensaje que ya el usuaio se encuentra logeado */
    <>
      <Navbar />
      {!store.token ||
        store.token === null ||
        store.token === "" ||
        store.token === undefined ? (
        <div className="container text-center align-items-center">
          <div className="p-3 border-0">
            <h1 className="text-center">Iniciar Sesión</h1>
            <div className="d-grid gap-2">
              <form className="form cardL m-auto align-middle">
                <div className="card_header">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
                  </svg>
                  <h1 className="form_heading">Sign in</h1>
                </div>
                <div className="field">
                  <label for="username">UserEmail</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Escriba su dirección de correo electrónico"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="field">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Por favor, escriba su contraseña"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="field">
                  <button className="button1 "
                    type="submit"
                    onClick={handleClick}
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
              <div className="d-grid gap-2 text-center">
                <span>¿No tienes una cuenta?{"   "}</span>
                <Link className="d-grid gap-2 text-center" to="/register">
                  <button type="submit" className="button1 ">
                    Regístrate
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /**Si tenemos token, el usuario está logeado y no mostramos el formulario de login */
        <div>
          <h1>ya estás logeado</h1>
        </div>
      )}
    </>
  );
};



