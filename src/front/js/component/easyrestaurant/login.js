import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const LogInAdmin = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    actions.loginRestaurant(email, password);
  };
  return (
    <div className="container text-center align-items-center ">
    <div className="p-3 border-0">
      <h1 className="text-center">Iniciar Sesión</h1>
      <div className="d-grid gap-2">
        <form className="form cardA m-auto align-middle ">
          <div className="card_header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
              ></path>
            </svg>
            <h1 className="form_Admin">Login</h1>
          </div>
          <div className="mb-3">
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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
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
          <button
            className="buttonAdmin  "
            type="submit"
            onClick={handleClick}
          >
            Iniciar sesión
          </button>
        </form>
        <div className="d-grid gap-2 text-center">
          <span>¿No tienes una cuenta?{"   "}</span>
          <Link to="/portal10">
          <span>Iniciar Sesión como Restaurante{"   "}</span>
          </Link>
          <Link className="d-grid gap-2 text-center" to="/register">
            <button type="submit" className="buttonAdmin ">
              Registrate
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};
