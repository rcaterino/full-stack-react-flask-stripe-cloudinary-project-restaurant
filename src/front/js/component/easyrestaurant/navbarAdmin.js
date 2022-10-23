import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

import Button from "react-bootstrap/Button";

export const NavbarAdmin = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /**la función handleLogout llama la función logout dentro de actions en flux.js y redirige el usuario al home */
  const handleLogout = () => {
    actions.logoutRestaurant();
    navigate("/admin");
  };
  /** con useEffect llamamos a la función getTokenFromSession para saber si el usuario está logeado leyendo si existe token en el store */
  useEffect(() => {
    store.restaurant_data;
  }, []);

  return (
    <div className="navbar">
      Easy Restaurant
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );
};
