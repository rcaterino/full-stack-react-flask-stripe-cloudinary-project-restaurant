import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { FaPizzaSlice } from "react-icons/fa";

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
              <form className="form cardL m-auto align-middle " >
                <div className="card_header">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
                  </svg>
                  <h1 className="form_heading">Login</h1>
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
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
                <button className="button1 btn "
                    type="submit"
                   onClick={handleClick}
                  >
                    Iniciar sesión
                   </button>
              </form>
              <div className="d-grid gap-2 text-center">
              <span>¿No tienes una cuenta?{"   "}</span>
              <Link className="d-grid gap-2 text-center" to="/register">
              <button type="submit" className="button1 ">
                Registrate
                </button>
                </Link>
                </div>
            </div>
          </div>
        </div>
      ) : (
        /**Si tenemos token, el usuario está logeado y no mostramos el formulario de login */
        <div className="container text-center align-items-center" style={{minHeight: "800px"}}>
          <h1>¡ya estás logeado!</h1>
          <h1>Te invitamos a conocer nuestro local</h1>
          <h1> y degustar nuestra excelentes pizzas</h1>
           {/* <div className="">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaPizzaSlice /> Localización
              </h6>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.453491523754!2d-3.7002924854345727!3d40.42095616330786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229c00799ed5d%3A0xdb745a3936539667!2sPORTAL%2010%20-%20Pizzas%20Artesanas%F0%9F%8D%95!5e0!3m2!1ses!2ses!4v1661363301167!5m2!1ses!2ses"
                width="1000"
                height="500"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>  */}
        </div>
      )}
    </>
  );
};
