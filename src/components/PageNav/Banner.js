import React from "react";
import carousel_1 from "../../assets/carousel_1.jpg";
import carousel_2 from "../../assets/carousel_2.jpg";
import carousel_3 from "../../assets/carousel_3.jpg";
import carousel_4 from "../../assets/carousel_4.jpg";
import carousel_5 from "../../assets/carousel_5.jpg";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner-container">
      <div className="banner py-4rem">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">

          {/* Banner images */}
          <div className="carousel-inner darkened-img">
            <div className="carousel-item active">
              <img
                src={carousel_1}
                className="d-block w-100 img-fluid"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={carousel_2}
                className="d-block w-100 img-fluid"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={carousel_3}
                className="d-block w-100 img-fluid"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={carousel_4}
                className="d-block w-100 img-fluid"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={carousel_5}
                className="d-block w-100 img-fluid"
                alt="..."
              />
            </div>
          </div>

          {/* banner texts */}
          <div className="banner-text text-light d-flex flex-column align-items-center">
            <p className="lg-py-2 text-center">Various types of Fishes from Home</p>
            <h1 className="lg-py-2 text-center">Fresh Fish in Reasonable Price</h1>
            <h3 className="lg-py-2 text-center">Explore Machbazar</h3>
          </div>


          {/* banner left button */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          {/* banner right button */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Banner;
