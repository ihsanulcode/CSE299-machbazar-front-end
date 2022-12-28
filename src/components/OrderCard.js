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
        style={{ width: "33rem", height: "100px", borderRadius: "5px" }}
        className="border border-secondary mx-auto d-flex  my-3"
      >
        <img src={order.fishImage} style={{ width: "100px" }} />

        <div className="d-flex justify-content-between w-100">
          <div className="ms-2">
            <p className="m-0 text-start">Order Id: <p className="d-inline text-primary">{order._id.substr(order._id.length - 6)}</p></p>
            <p className="m-0 text-start">Product Name: <p className="d-inline text-primary">{order.name}</p></p>
            <p className="m-0 text-start">
              Weight: <p className="d-inline text-primary">{order.weight}</p>
            </p>
            <p className="m-0 text-start">
              Price: <p className="d-inline text-primary ">{order.price}</p>
            </p>
          </div>

          {/* delete button  */}
          {order.orderStatus === "completed" ? <></> : <button
            className="btn btn-danger m-0"
            style={{ marginRight: "0" }}
            onClick={() => handleDelete(order)}
          >
            Delete
          </button>}

          {/* delivered button  */}
          {seller && order.orderStatus === "pending" && (
            <button
              className="btn btn-success m-0"
              style={{ marginRight: "0" }}
              onClick={handleUpdate}
            >
              Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
