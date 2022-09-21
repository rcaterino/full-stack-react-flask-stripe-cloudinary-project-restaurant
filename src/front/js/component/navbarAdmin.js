import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavbarAdmin = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  /**la función handleLogout llama la función logout dentro de actions en flux.js y redirige el usuario al home */
  const handleLogout = () => {
    actions.logoutRestaurant();
    navigate("/easyrestaurant/admin");
  };
  /** con useEffect llamamos a la función getTokenFromSession para saber si el usuario está logeado leyendo si existe token en el store */
  useEffect(() => {
    store.restaurant_data;
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-3"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/easyrestaurant/admin">Easy Restaurant</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">POS</Nav.Link>
            <Nav.Link href="#pricing">
              <Link to="/easyrestaurant/cocina">Cocina</Link>
            </Nav.Link>
            <NavDropdown
              title="Configuración de la Carta"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                <Link to="/easyrestaurant/alergenos">Alergenos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Link to="/easyrestaurant/ingredientes">Ingredientes</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                <Link to="/easyrestaurant/categorias">Categorías</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                <Link to="/easyrestaurant/productos">Productos</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5">
                <Link to="/easyrestaurant/clientes">Clientes</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.6">
                <Link to="/easyrestaurant/correlativos">Correlativos</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Settings</Nav.Link>
            <Nav.Link eventKey={2} onClick={handleLogout}>
              LogOut
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
