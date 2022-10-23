import React, { useState } from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Link to="/admin">Inicio</Link>
        <Link to="/admin/cocina">Cocina</Link>
        <NavDropdown
          title="Configuración de la Carta"
          id="collasible-nav-dropdown"
        >
          <NavDropdown.Item>
            <Link to="/admin/categorias">Categorías</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/admin/alergenos">Alergenos</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/admin/ingredientes">Ingredientes</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/admin/productos">Productos</Link>
          </NavDropdown.Item>
        </NavDropdown>
        <Link to="/admin/clientes">Clientes</Link>
      </Nav>
    </div>
  );
};
