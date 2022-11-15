import React from "react";

export const Footer = () => {
  return (
    <footer className="footer py-3 text-center align-items-center  ">
      <section className="container-fluid d-flex justify-content-center  p-1 border-bottom">
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

  

      <div
        className="text-center p-4 "
        style={{ background: "darkorange" }}
      >
        © 2022 Copyright:{" "}
        <a className="text-reset fw-bold" href="/">
          Portal 10
        </a>
      </div>
    </footer>
  );
};
