import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Quienes somos</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
		<Link to="/menú">
          <a class="nav-link" href="#">Menú</a>
		  </Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Login/Registro</a>
        </li>
      </ul>
    </div>
	<div class="nav-item">
	<Link to="/carrito">
          <a class="align-self-end btn btn-outline-success" href="#" tabindex="-1" aria-disabled="true">Carrito</a>
		</Link>
        </div>
  </div>
</nav>
	);
};
