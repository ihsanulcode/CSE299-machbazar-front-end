import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../contexts/AuthProvider";

function CartSummary({ cartItems, setCartItems, total, setTotal }) {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({ orderStatus: "pending" });
  const { user } = useContext(AuthContext);

  const handleCheckout = () => {
    setShow(true);
  };

  const deleteCart = () => {
    fetch(`http://localhost:5000/deleteCart/${user.uid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems([]);
        console.log("order", order);
      });
  };

  const handleClose = () => {
    setShow(false);
    cartItems.map((item) => {
      order.category = item.category;
      order.fishImage = item.fishImage;
      order.name = item.name;
      order.price = item.price;
      order.sellerId = item.sellerId;
      order.user = item.user;
      order.weight = item.weight;

      fetch("http://localhost:5000/order/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setTotal(0);
          }
        });
    });
    deleteCart();
  };

  useEffect(() => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice = totalPrice + JSON.parse(item.price);
    });
    setTotal(totalPrice);
  }, []);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thank You for Shopping with us</Modal.Title>
          </Modal.Header>
          <Modal.Body>Order for total Tk{(total + 10).toFixed(2)}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Confirm Order
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="card border-secondary mb-5">
        <div className="card-header bg-light border-0">
          <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3 pt-1">
            <h6 className="font-weight-medium">Subtotal</h6>
            <h6 className="font-weight-medium">{total.toFixed(2)} tk</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">10 tk</h6>
          </div>
        </div>
        <div className="card-footer border-secondary bg-transparent">
          <div className="d-flex justify-content-between mt-2">
            <h5 className="font-weight-bold">Total</h5>
            <h5 className="font-weight-bold">
              {cartItems?.length === 0 ? total : (total + 10).toFixed(2)} tk
            </h5>
          </div>
          <button
            className="btn btn-block btn-primary my-3 py-3"
            onClick={handleCheckout}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartSummary;
