import Nav from 'react-bootstrap/Nav';
import React from 'react';

const UserNavBar = () => {
  return (
    <Nav variant="tabs" defaultActiveKey="/miperfil">
      <Nav.Item>
        <Nav.Link href="/miperfil">Mis datos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Mis alergenos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled">
          Mis direcciones
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default UserNavBar;