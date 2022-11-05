import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export const NavbarEasy = () => {
  return (
    <Navbar className="sticky-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="m-auto p-3">
        <Navbar.Brand href="/home">
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
						<Nav.Link href="/Quienes Somos">Quienes Somos</Nav.Link>
            <Nav.Link href="/pricing">Precios</Nav.Link>
            <Nav.Link href="/admin">Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Button variant="outline-primary">Solicitar Demo</Button>{" "}
        </Nav>
      </Container>
    </Navbar>
  );
};
