import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const CarouselHome = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="myCarousel carousel-item active">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <img width="100%" height="100%" fill="#777" />
          </svg>

          <div className="container">
            <div className="carousel-caption text-start mb-5" >
              <h1 className="Letra">Portal 10</h1>
              <p className="Letra">
                La mejor calidad en nuestras Pizzas
              </p>
              <p>
              <Link to="/portal10/cocina">
                <a className="btn btn-lg btn-primary" href="#">
                  Ir al Menu
                </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className=" myCarousel carousel-item">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >

            <img width="100%" height="100%" fill="#777" />
          </svg>

          <div className="container">
            <div className="carousel-caption">
              <h1>
                Empanadas Argentinas al mejor precio
              </h1>
              <p>
                Los ingredientes mas frescos para nuestros clientes
              </p>
              <p>
              <Link to="/portal10/categorias">
                <a className="btn btn-lg btn-primary" href="#">
                  Ir al carrito
                </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className=" myCarousel carousel-item">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <img width="100%" height="100%" fill="#777" />
          </svg>

          <div className="container">
            <div className="carousel-caption text-end">
              <h1></h1>
              <p>
                Sigamos con tu marca personal, tus productos estrella
              </p>
              <p>
                <Link to="/portal10/productos">
                <a className="btn btn-lg btn-primary" href="#">
                  Modificar productos
                </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};