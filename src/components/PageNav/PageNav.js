import React from "react";
import { Link } from "react-router-dom";
import "../MainNav/MainNav.css";
import Categories from "../Header/HeaderBody/Categories/Categories";
import "./PageNav.css";

function PageNav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="d-flex">
            <div className="navbarBrand d-lg-none d-sm-block">
              <Link to="/" className="text-decoration-none">
                <h2 className="fw-bold">Machbazar</h2>
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/categories/crab`}
                >
                  Crab
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={`/categories/prawn`}
                >
                  Prawn
                </Link>
              </li>

              <li className="nav-item d-lg-none d-md-block d-block">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={`/categories/sea`}
                >
                  Sea
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={`/categories/sea`}
                >
                  Sea
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/categories/pond`}
                >
                  Pond
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/categories/river`}
                >
                  River
                </Link>
              </li>
              <li className="nav-item d-lg-none d-md-block d-block">
                <Link className="nav-link " aria-current="page" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item d-lg-none d-block">
                <Link className="nav-link " aria-current="page" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item d-lg-none d-block">
                <Categories></Categories>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default PageNav;
