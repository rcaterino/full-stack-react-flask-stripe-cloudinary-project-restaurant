import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarAdmin } from "../component/navbarAdmin";
import { Context } from "../store/appContext";

export const EasyRestaurant = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  /** con useEffect llamamos a la función getTokenFromSession para saber si el usuario está logeado leyendo si existe token en el store */
  useEffect(() => {
    actions.getTokenFromSession();
    store.token;
  }, []);

  const handleClick = () => {
    actions.loginRestaurant(email, password);
  };

  const handleLogout = () => {
    actions.logoutRestaurant();
  };

  return (
    <>
      {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <div className="container text-center align-items-center">
          <div className="row">
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
        </div>
      ) : (
      <NavbarAdmin/>
        )}
    </>
  );
};
