import React from "react";

export const CarouselHome = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
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
        <div className="carousel-item active">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777" />
          </svg>

          <div className="container">
            <div className="carousel-caption text-start mb-5" >
              <h1>Easy Restaurant</h1>
              <p>
               !Recuerda que tienes tu cocina donde ver los pedidos!
              </p>
              <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Ir a cocina
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777" />
          </svg>

          <div className="container">
            <div className="carousel-caption">
              <h1>
                Vamos a modificar tu menu, personalizalo a tu gusto
              </h1>
              <p>
                Tenemos la posibilidad de adaptar nuestro menu a tus necesidades, comencemos con las categorias
              </p>
              <p>
                <a className="btn btn-lg btn-primary" href="#">
                 Modificar categorias
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777" />
          </svg>

          <div className="container">
            <div className="carousel-caption text-end">
              <h1>Sabemos que tu variedad es amplia, que mejor que tener una gran cantidad de Productos</h1>
              <p>
                Sigamos con tu marca personal, tus productos estrella
              </p>
              <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Modificar productos
                </a>
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
