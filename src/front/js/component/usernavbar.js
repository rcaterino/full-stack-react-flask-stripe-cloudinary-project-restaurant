import Nav from "react-bootstrap/Nav";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" href="#">
          <Link to="/miperfil">
            <span>Mi perfil</span>
          </Link>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <Link to="/">
            <span>Mis alérgenos</span>
          </Link>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <Link to="/quienessomos">
            <span>Mis direcciones</span>
          </Link>
        </a>
      </li>
    </ul>
  );
};

export default UserNavBar;
