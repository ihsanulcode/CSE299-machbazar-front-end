import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function OrderCard({ order, handleDelete }) {
  const { seller } = useContext(AuthContext);
  const handleUpdate = () => {
    order.orderStatus = "completed";
    fetch(`http://localhost:5000/updateOrder/${order._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("order updated");
        }
      });
  };
  return (
    <div>
      <div
        style={{ width: "31rem", height: "100px", borderRadius: "5px" }}
        className="border border-secondary mx-auto d-flex  my-3"
      >
        <img src={order.fishImage} style={{ width: "100px" }} />
        <div className="d-flex justify-content-between w-100">
          <div className="ms-4">
            <p className="m-0">name: {order.name}</p>
            <p className="m-0">
              weight: <p className="d-inline text-primary">{order.weight}</p>
            </p>
            <p className="m-0">
              price: <p className="d-inline text-primary ">{order.price}</p>
            </p>
          </div>
          <button
            className="btn btn-danger me-0"
            style={{ marginRight: "0" }}
            onClick={() => handleDelete(order)}
          >
            delete
          </button>
        </div>
      </div>
      <div className="m-0">
        {seller && order.orderStatus === "pending" && (
          <button
            className="btn btn-light border-success me-0"
            style={{ marginRight: "0" }}
            onClick={handleUpdate}
          >
            order completed
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
