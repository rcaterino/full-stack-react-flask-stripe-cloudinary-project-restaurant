import React from "react";
import { FaPizzaSlice } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="py-3 text-center align-items-center">
      <section className="container-fluid d-flex justify-content-center  p-4 border-bottom">
        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="container-fluid">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaPizzaSlice /> Localización
              </h6>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.453491523754!2d-3.7002924854345727!3d40.42095616330786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229c00799ed5d%3A0xdb745a3936539667!2sPORTAL%2010%20-%20Pizzas%20Artesanas%F0%9F%8D%95!5e0!3m2!1ses!2ses!4v1661363301167!5m2!1ses!2ses"
                width="400"
                height="200"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
              <a href="https://g.page/Portal-10?share">
                <i className="fas fa-home me-1"></i> Calle de Barbieri, 10
                (Madrid)
              </a>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-2"></i> 91 1458110
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ background: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:{" "}
        <a className="text-reset fw-bold" href="/">
          Portal 10
        </a>
      </div>
    </footer>
  );
};
