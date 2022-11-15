import React from "react";

import Orders from "../../component/easyrestaurant/Orders";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PedidosDiarios from "../../component/easyrestaurant/PedidosDiarios";
import VentasDiarias from "../../component/easyrestaurant/VentasDiarias";

export default function Main() {
  return (
    <div>
      <Container>
         Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop 
         <Row>
          <Col className="rounded shadow bg-light m-2 p-3 m-auto" xs={6} md={5}>
            <h6>Ventas Últimos 7 días</h6>
            <VentasDiarias />
          </Col>
          <Col className="rounded shadow bg-light m-2 p-3 m-auto" xs={6} md={5}>
            <PedidosDiarios />
          </Col>
        </Row> 
        <Row className="m-2 p-3 m-auto">
          <Col>
            <Orders />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
