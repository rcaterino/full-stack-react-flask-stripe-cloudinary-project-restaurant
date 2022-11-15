import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
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
        <div className="rounded shadow m-auto align-items-center">
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
        </div>
      ) : (
        <CardGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {store.order.map((order) => (
              <div>
                <Card bg="warning">
                  <Card.Body>
                    <Card.Title>
                      <h1>Pedido Número: {order.order_id}</h1>
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
                    </Card.Text>
                    <Button
                      className="p-1"
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
              </div>
            ))}
          </Row>
        </CardGroup>
      )}
    </>
  );
};
