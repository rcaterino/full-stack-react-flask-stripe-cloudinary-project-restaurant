import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

export const NavbarEasy = () => {
  return (
    <Navbar
      className="sticky-top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container className="m-auto p-3">
        <Navbar.Brand to="/home">
          <img
            alt=""
            src=""
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Easy Restaurant App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink to="/Quienes Somos">Quienes Somos</NavLink>
            <NavLink to="/pricing">Precios</NavLink>
            <NavLink to="/dashboard/login">Iniciar Sesión</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Button variant="outline-primary">Solicitar Demo</Button>{" "}
        </Nav>
      </Container>
    </Navbar>
  );
};
