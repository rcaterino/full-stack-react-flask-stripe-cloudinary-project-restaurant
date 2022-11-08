import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Category,
  ExitToApp,
  ListAlt,
  LocalPizza,
  Motorcycle,
  PeopleAlt,
  RateReview,
  Receipt,
  Store,
  ViewQuilt,
  Warning,
} from "@material-ui/icons";

import { Cocina } from "./cocina";
import { Alergenos } from "./alergenos";
import { Ingredientes } from "./ingredientes";
import { Categorias } from "./categorias";
import { Productos } from "./productos";
import { Clientes } from "./clientes";
import { Correlativos } from "./correlativos";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Easy Restaurant - Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <ViewQuilt />
            </ListItemIcon>
            <ListItemText primary="Tablero" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/cocina">
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/clientes">
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>
          
          <ListItem button component={Link} to="/dashboard/tiendas">
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary="Tiendas" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/categorias">
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/alergenos">
            <ListItemIcon>
              <Warning />
            </ListItemIcon>
            <ListItemText primary="Alergenos" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/ingredientes">
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Ingredientes" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/productos">
            <ListItemIcon>
              <LocalPizza />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>
          <ListItem button component={Link} to="/home">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route element={<Cocina />} path="/cocina" />
          <Route element={<Alergenos />} path="/alergenos" />
          <Route element={<Ingredientes />} path="/ingredientes" />
          <Route element={<Categorias />} path="/categorias" />
          <Route element={<Productos />} path="/productos" />
          <Route element={<Clientes />} path="/clientes" />
          <Route element={<Correlativos />} path="/correlativos" />
        </Routes>
      </main>
    </div>
  );
};
