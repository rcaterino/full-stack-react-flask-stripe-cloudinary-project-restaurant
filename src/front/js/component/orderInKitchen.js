import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function OrderInKitchen() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getOrder();
    console.log(store.order);
  }, []);

  return (
    <>
      {!store.orders ||
      store.orders === null ||
      store.orders === "" ||
      store.orders === undefined ? (
        <div className="container mt-3">
          <div className="alert alert-warning" role="alert">
            Sin pedidos
          </div>
        </div>
      ) : (
        // store.orders.map((order) => (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>titulo</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Entregar pedido</Button>
          </Card.Body>
        </Card>
        // ))
      )}
    </>
  );
}

export default OrderInKitchen;
