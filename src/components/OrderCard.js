import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function OrderCard({ order, handleDelete, handleUpdate }) {
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const { seller } = useContext(AuthContext);
  const orderId = order._id;

  const handleDetails = () => {
    setShow(true);
    if (seller) {
      fetch(`http://localhost:5000/user/${order.user}`)
        .then((res) => res.json())
        .then((data) => setModalInfo(data));
    } else {
      fetch(`http://localhost:5000/user/${order.sellerId}`)
        .then((res) => res.json())
        .then((data) => setModalInfo(data));
    }
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <p>Name: {modalInfo.name}</p>
            <p>Phone: {modalInfo.phone}</p>
            <p>Address: {modalInfo.address}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div
        style={{ width: "40rem", height: "100px", borderRadius: "5px" }}
        className="border border-secondary mx-auto d-flex  my-3"
      >
        <img src={order.fishImage} style={{ width: "100px" }} />

        <div className="d-flex justify-content-between w-100">
          <div className="ms-2">
            <p className="m-0 text-start">
              <p className="d-inline fw-bold">OrderId: </p>{" "}
              <p className="d-inline text-primary">{orderId.slice(-6)}</p>
            </p>
            <p className="m-0 text-start">
              Product: <p className="d-inline text-primary"> {order.name}</p>
            </p>
            <p className="m-0 text-start">
              Weight: <p className="d-inline text-primary">{order.weight}</p>
            </p>
            <p className="m-0 text-start">
              Price: <p className="d-inline text-primary ">{order.price}</p>
            </p>
          </div>
          <div>
            <button
              className="btn btn-light text-primary border-primary p-0"
              style={{ width: "100px", height: "100px" }}
              onClick={handleDetails}
            >
              View <br /> details
            </button>
            {seller && order.orderStatus === "pending" && (
              <>
                <button
                  className="btn btn-success p-0"
                  style={{ width: "100px", height: "100px" }}
                  onClick={() => handleUpdate(order)}
                >
                  Order <br /> Delivered
                </button>
              </>
            )}
            {order.orderStatus === "pending" && (
              <button
                className="btn btn-danger me-0"
                style={{ width: "100px", height: "100px" }}
                onClick={() => handleDelete(order)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
