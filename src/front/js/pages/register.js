import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  /* la función handleClick llama a la funciòn sigup dentro de actions en flux.js, enviando los parámetros necesarios y luego redirige el usuario al home */
  const handleClick = () => {
    actions.signup(nombre, apellidos, birthday, phone, email, password);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container col align-items-center">
        <form className="form cardR m-auto mt-5">
          <div className="card_header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
            </svg>
            <h1 className="form_heading">Sign in</h1>
          </div>
          <div className="field">
            <label for="username">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Indique su nombre"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label for="password">Apellidos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Indique sus Apellidos"
              value={apellidos}
              onChange={(e) => {
                setApellidos(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label for="password">birthday</label>
            <input
              className="form-control"
              type="date"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label for="password">phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Escriba su número telefónico"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label for="password">email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Escriba su correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label for="password">Contraseña</label>
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
          <div className="field m-auto">
            <button
              type="submit"
              className="button1"
              onClick={handleClick}
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


