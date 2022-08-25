import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
