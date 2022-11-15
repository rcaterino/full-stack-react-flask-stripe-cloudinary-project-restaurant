import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Header, Image, Table } from 'semantic-ui-react'
import { Icon, Label, Menu } from 'semantic-ui-react'


export const OrderDetail = () => {
  const { store, actions } = useContext(Context);
  const [order, setOrder] = useState(false);

  const deleteCarrito = () => {
    actions.deleteCarrito();
  };

  useEffect(() => {
    store.order_detail;
    if (store.order_detail.length > 0) setOrder(true);
  }, [order]);

  console.log(store.order_detail);
  return (
    <div className="recibo">
      {store.order_detail.map((order) => (
        <div>

          <Table basic='very' celled collapsing>
            <Table.Header >
              <Table.Row className="d-flex text-aligne" >
                <span>
                  <i className="logo fa-solid fa-bag-shopping"></i>
                </span>
                <span className="" >
                  <h1 className="Letra" key={order.order_id}>Total:${order["order_total"]}</h1>
                  <h4 >Cliente: {order["client"]}</h4>
                  <h4 >Fecha: {order["order_date"]}</h4>
                </span>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header  >
                    <Header.Content  >
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Productos</Table.HeaderCell>
                            <Table.HeaderCell>Precio</Table.HeaderCell>
                            
                          </Table.Row>
                        </Table.Header>
                        {order["order_detail"].map((index, i) => (
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <span className="d-flex text-aligne">
                                <i className="logo2 fa-solid fa-pizza-slice "></i>
                                  <Label ribbon>{index["product_name"]}</Label>
                                </span>
                              </Table.Cell>
                              <Table.Cell>${index["subtotal"]}</Table.Cell>
                              
                            </Table.Row>
                          </Table.Body>
                        ))}
                        <Table.Footer>
                          <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Footer>
                      </Table>
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div>
          </div>
          <Link to="/">
        <div className="d-flex justify-content-center">
          <button className="button3" type="submit">
            <span></span>
            Volver al menu
          </button>
        </div>
      </Link>
        </div>
      ))}

    </div>

  );
};
