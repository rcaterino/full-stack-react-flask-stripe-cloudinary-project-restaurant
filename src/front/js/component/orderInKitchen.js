import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const OrderInKitchen = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      actions.getOrder();
    }, 5000);
  }, []);

  function endOrder(id) {
    actions.orderToDelete(id);
  }

  return (
    <>
      {!store.order ||
      store.order === null ||
      store.order === "" ||
      store.order === undefined ? (
        <div className="container mt-3">
          <div className="alert alert-warning" role="alert">
            Sin pedidos
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {store.order.map((order) => (
              <Card style={{ width: "18rem" }} className="col-sm-4 mb-3 m-auto">
                <Card.Body>
                  <Card.Title>{order.order_number}</Card.Title>
                  <Card.Text>{order.order_comments}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      const orderToDelete = order.order_id;
                      endOrder(orderToDelete);
                    }}
                  >
                    Entregar pedido
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
