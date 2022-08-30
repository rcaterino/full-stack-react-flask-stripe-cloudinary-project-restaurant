import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [ email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate ();
  
  const handleClick =()=> {
    actions.login (email,password);
    navigate("/")
  }

  return (
    /* utilizando el operador ternario, evaluamos si la variable token dentro de store está vacía, nula o indefinida para renderizar el componente de login /
    /* en caso que si tenemos token guardado en la sesión, renderizamos el mensaje que ya el usuaio se encuentra logeado */
    <>
      {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <div className="p-3 border-0">
          <h1 className="text-center">Iniciar Sesión</h1>
          <div className="d-grid gap-2">
            <input
              type="email"
              className="form-control"
              placeholder="Escriba su dirección de correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Por favor, escriba su contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Iniciar sesión
            </button>
            <div className="d-grid gap-2 text-center">
              <span>¿No tienes una cuenta?{"   "}</span>
              <Link className="d-grid gap-2 text-center" to="/register">
                <button type="submit" className="btn btn-primary">
                  Regístrate
                </button>
              </Link>
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