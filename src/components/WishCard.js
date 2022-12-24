import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

function WishCard({ fish, handleDelete }) {
  const { name, weight, price, fishImage } = fish;
  const [wishItem, setWishItem] = useState({
    user: "",
  });
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    fetch("http://localhost:5000/addCartItem", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("product added to cart");
          handleDelete(fish);
        }
      });
  };

  useEffect(() => {
    const newItem = {};
    newItem.name = name;
    newItem.category = fish.category;
    newItem.fishImage = fishImage;
    newItem.price = price;
    newItem.weight = weight;
    newItem.sellerId = fish.sellerId;
    setWishItem({ ...newItem, user: user.uid });
  }, []);

  return (
    <div>
      <div
        className="card my-4 text-center "
        style={{ width: "200px", height: "300px" }}
      >
        <img
          src={fishImage}
          className="card-img-top img-fluid"
          alt="fish"
          style={{ height: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p>
            <small>{weight}</small>
          </p>
          <p className="card-text fw-bold">Tk {price}.00</p>

          <button
            className="btn btn-light border-primary d-inline"
            onClick={handleAddToCart}
          >
            cart
          </button>
          <button
            className="btn btn-light border-danger mx-2 d-inline"
            onClick={() => handleDelete(fish)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishCard;
