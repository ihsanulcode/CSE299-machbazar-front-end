import React from "react";

function SellerFishCard({ fish, handleDelete }) {
  const { name, weight, price, fishImage, _id } = fish;

  return (
    <div>
      <div className="card my-2 text-center " style={{ width: "18rem" }}>
        <img src={fishImage} className="card-img-top img-fluid" alt="fish" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p>
            <small>weight: {weight}gm</small>
          </p>
          <p className="card-text fw-bold">Tk {price}.00</p>
          <button
            onClick={() => handleDelete(fish)}
            className="btn btn-danger border border-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerFishCard;
