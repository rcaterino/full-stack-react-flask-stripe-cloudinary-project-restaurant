import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LoginAdmin = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    actions.login(email, password);
    navigate("/cocina");
  };

  return (
    <>
      <div className="container text-center align-items-center">
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
        </div>
    </>
  );
};
