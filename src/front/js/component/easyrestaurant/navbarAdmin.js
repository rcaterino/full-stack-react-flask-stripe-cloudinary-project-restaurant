import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavbarAdmin = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  
  const handleLogout = () => {
    actions.logoutRestaurant();
    navigate("/admin");
  };
  /** con useEffect llamamos a la función getTokenFromSession para saber si el usuario está logeado leyendo si existe token en el store */
  useEffect(() => {
    store.restaurant_data;
  }, []);

  return (
    <div>
      <Navbar className="p-1" collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/admin">Easy Restaurant</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link ><Link className="text-white" to="/admin/cocina">Cocina</Link></Nav.Link>
              <NavDropdown title="Configurar Carta" id="collasible-nav-dropdown">
                <NavDropdown.Item ><Link to="/admin/categorias">Categorías</Link></NavDropdown.Item>
                <NavDropdown.Item >
                <Link to="/admin/alergenos">Alergenos</Link>
                </NavDropdown.Item>
                {/* <NavDropdown.Item >
                <Link to="/admin/ingredientes">Ingredientes</Link>
                </NavDropdown.Item> */}
                <NavDropdown.Item >
                <Link to="/admin/productos">Productos</Link>
                </NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item >
                <Link to="/admin/clientes">Clientes</Link>
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Nav>
              <Button onClick={handleLogout}>LogOut</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    </div>
  );
};
