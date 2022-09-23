import Nav from "react-bootstrap/Nav";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-link">
          <Link to="/miperfil">
            <span>Mi perfil</span>
          </Link>
      </li>
      <li className="nav-link">
          <Link to="/alergenos">
            <span>Mis alérgenos</span>
          </Link>
      </li>
      <li className="nav-link">
          <Link to="/quienessomos">
            <span>Mis direcciones</span>
          </Link>
      </li>
    </ul>
  );
};

export default UserNavBar;
