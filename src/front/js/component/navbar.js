import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Quienes somos</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li className="nav-item">
							<Link to="/menú">
								<a className="nav-link" href="#">Menú</a>
							</Link>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Login/Registro</a>
						</li>
					</ul>
				</div>
				<div className="nav-item">
					<Link to="/carrito">
						<a className="align-self-end btn btn-outline-success" href="#" tabindex="-1" aria-disabled="true">Carrito</a>
					</Link>
				</div>
			</div>
		</nav>

	);
};
