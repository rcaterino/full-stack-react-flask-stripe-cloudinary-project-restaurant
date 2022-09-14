import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import getState from "../store/flux";

export const OrderInKitchen = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    store.order;
    setInterval(() => {
      actions.getOrder();
    }, 10000);
  }, []);

  function endOrder(id) {
    actions.orderToDelete(id);
  }

  return (
    <>
      {!store.order ||
      store.order == null ||
      store.order == "" ||
      store.order == undefined ? (
        <Alert variant="danger">
          <Alert.Heading>
            Oh no, ¡en este momento no tenemos pedidos para preparar!
          </Alert.Heading>
          <hr />
          <h6 className="mb-0">
            Aprovecha para tomarte un respiro, hidratarte y de ser posible,
            poner en orden, limpiar y reabastecer de material tu espacio de
            trabajo
          </h6>
        </Alert>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {store.order.map((order) => (
              <Card
                style={{ width: "100%", height: "100%" }}
                className="col-sm-6 mb-3 m-auto bg-warning"
              >
                <Card.Body>
                  <Card.Title>
                    <h1>Pedido Número: {order.order_number}</h1>
                  </Card.Title>
                  <Card.Text>
                    <ListGroup>
                      {order.order_detail.map((item) => (
                        <>
                          <ListGroup.Item className="bg-danger text-white">
                            <p>{item.product_name}</p>
                          </ListGroup.Item>
                        </>
                      ))}
                      ,
                    </ListGroup>
                    <h3>Detalles del pedido: </h3>
                    <h4>{order.order_comments}</h4>
                  </Card.Text>
                  <Button
                    className="p-3"
                    variant="success"
                    onClick={(e) => {
                      const orderToDelete = order.order_id;
                      endOrder(orderToDelete);
                    }}
                  >
                    <h6>Entregar pedido</h6>
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
