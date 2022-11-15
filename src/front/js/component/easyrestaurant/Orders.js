import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../js/store/appContext";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Container, IconButton } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const { store, actions } = useContext(Context);
  const [open, setOpen] = useState(false);

  const rows = store.order;
  console.log("rows to print");
  console.log(rows);

  const classes = useStyles();
  return (
    <Container className="bg-light rounded shadow">
      <React.Fragment>
        <Title>Pedidos en preparación</Title>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              
              <TableCell>Id</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell align="right">Monto Pagado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.order_id}>
                <TableCell>{row.order_id}</TableCell>
                <TableCell>{row.order_date}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.order_comments}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.order_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Container>
  );
}
