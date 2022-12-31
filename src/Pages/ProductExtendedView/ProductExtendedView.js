import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import cod from "../../assets/cod.png";
import charge from "../../assets/charge.png";
import delivery from "../../assets/delivery.png";
import "./ProductExtendedView.css";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

function ProductExtendedView() {
  const [cartItem, setCartItem] = useState({
    user: "",
  });

  const [seller, setSeller] = useState({});
  const fish = useLoaderData();
  const { name, fishImage, price, weight } = fish;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${fish.sellerId}`)
      .then((res) => res.json())
      .then((data) => setSeller(data));

    const newItem = {};
    newItem.name = name;
    newItem.category = fish.category;
    newItem.fishImage = fishImage;
    newItem.price = price;
    newItem.weight = weight;
    newItem.sellerId = fish.sellerId;

    setCartItem({ ...newItem, user: user.uid });
  }, []);

  const handleAddToCart = () => {
    fetch("http://localhost:5000/addCartItem", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("product added to cart");
        }
      });
    // console.log(cartItem);
  };

  const handleAddToWish = () => {
    fetch("http://localhost:5000/wishlist/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("product added to wish list");
        }
      });
  };

  return (
    <div>
      <Container className="my-5">
        <Row>
          {/* ----------------------- fish details---------------------- */}
          <Col className="product-container d-lg-flex gx-4" xs="12" lg="8">
            <img className="img-fluid" src={fishImage} alt="" />
            <div className="product-info mt-3 ms-4">
              <h3>{name}</h3>
              <p>
                By <p className="text-primary d-inline">{seller.name}</p>
              </p>
              <p>
                Category : <p className="fw-bold d-inline">{fish.category}</p>
              </p>
              <hr className="border border-2 black" />
              <p>
                Weight : <p className="fw-bold d-inline">{weight} gm</p>
              </p>
              <h3>Tk. {price}</h3>
              <p>
                <small>
                  Net weight will be 10-20% lower depending on cutting
                  preference
                </small>
              </p>
              <div className="in-stock d-flex align-items-center">
                <FaCheckCircle className="check-icon" />
                <p className="mt-3 ms-2">
                  <small>In Stock</small>
                </p>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-around mb-3">
                <button
                  className="btn btn-light border border-secondary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-light border border-secondary"
                  onClick={handleAddToWish}
                >
                  Add to WishList
                </button>
              </div>
            </div>
          </Col>

          {/* -------------------------- store details--------------------- */}
          <Col className="store-detail-container" xs lg="4">
            <div className="store-detail">
              <Container className="mt-3">
                <div className="d-flex align-items-center justify-content-around mt-3">
                  <img src={cod} alt="" />
                  <p className="fw-bold mt-3">Cash on Delivery</p>
                </div>
                <div className="d-flex align-items-center justify-content-around mt-3">
                  <img src={charge} alt="" />
                  <p className="fw-bold mt-3">Delivery Charge</p>
                </div>
                <div className="d-flex align-items-center justify-content-around mt-3">
                  <img src={delivery} alt="" />
                  <p className="fw-bold mt-3">Standard Delivery</p>
                </div>
              </Container>

              <hr className="border border-2" />

              <Container className="mb-4">
                <p>
                  <small className="text-muted">sold by</small>
                </p>
                <div className="d-flex justify-content-around align-items-center">
                  <p>
                    <small>{seller.name}</small>
                  </p>
                </div>
                <div className="d-flex my-2 mb-4">
                  <p className="calling-info">
                    <small className="text-secondary">
                      Call our hotline for any information about order :
                    </small>
                  </p>
                  <p className="mt-4">
                    {" "}
                    <small>{seller.phone}</small>
                  </p>
                </div>
              </Container>
              <hr className="mt-4" />
              <div className="text-center">
                <small>
                  Shop Address: <br />
                  {seller.address}
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductExtendedView;
