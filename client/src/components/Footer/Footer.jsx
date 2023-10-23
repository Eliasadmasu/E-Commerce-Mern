import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container my-5 full">
      {/* Footer */}
      <footer className="text-center text-lg-start text-white footer">
        {/* Grid container */}
        <div className="container p-4">
          {/* Section: Links */}
          <section className="footer-section">
            {/* Grid row */}
            <div className="row">
              {/* Grid column */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Shop house
                </h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  iure consequuntur pariatur reiciendis in sint qui unde
                  voluptates? Distinctio eum quibusdam aperiam dignissimos
                  veritatis velit ex, libero iure hic sed!
                </p>
              </div>
              {/* Grid column */}

              {/* ... (Other columns and sections) ... */}
            </div>
            {/* Grid row */}
          </section>
          {/* Section: Links */}

          <hr className="my-3" />

          {/* Section: Copyright */}
          <section className="footer-section p-3">
            <div className="row d-flex align-items-center">
              {/* Grid column */}
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                {/* Copyright */}
                <div className="p-3">
                  © 2020 Copyright:{" "}
                  <a className="text-white" href="https://mdbootstrap.com/">
                    MDBootstrap.com
                  </a>
                </div>
                {/* Copyright */}
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                {/* Social media icons */}
                <a href={"a"} className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href={"a"} className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={"a"} className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href={"a"} className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              {/* Grid column */}
            </div>
          </section>
          {/* Section: Copyright */}
        </div>
        {/* Grid container */}
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Footer;
