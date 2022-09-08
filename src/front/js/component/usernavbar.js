import Nav from "react-bootstrap/Nav";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = () => {
  return (
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">
          <Link to="/miperfil">
            <span>Mi perfil</span>
          </Link>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <Link to="/">
            <span>Mis alérgenos</span>
          </Link>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <Link to="/quienessomos">
            <span>Mis direcciones</span>
          </Link>
        </a>
      </li>
    </ul>

    // <Nav variant="tabs" defaultActiveKey="/miperfil">
    //   <Nav.Item>
    //     <Nav.Link href="/miperfil"></Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="link-1">Mis alergenos</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="disabled">
    //       Mis direcciones
    //     </Nav.Link>
    //   </Nav.Item>
    // </Nav>
  );
};

export default UserNavBar;
