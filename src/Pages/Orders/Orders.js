import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OrderCard from "../../components/OrderCard";
import SideNav from "../../components/SideNav";
import { AuthContext } from "../../contexts/AuthProvider";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user, seller } = useContext(AuthContext);
  let [pendingOrders, setPendingOrders] = useState([]);
  let [completedOrders, setCompletedOrders] = useState([]);

  const handleDelete = (item) => {
    const agree = window.confirm(
      `Are you sure you want to delete: ${item.name}`
    );
    if (agree) {
      fetch(`http://localhost:5000/deleteOrder/${item._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.deletedCount > 0) {
            const remainingItems = orders.filter((it) => it._id != item._id);
            setOrders(remainingItems);
            setPendingOrders(
              remainingItems.filter((order) => order.orderStatus === "pending")
            );
            setCompletedOrders(
              remainingItems.filter(
                (order) => order.orderStatus === "completed"
              )
            );
          }
        });
    }
  };

  const handleUpdate = (order) => {
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
          const remainingItems = orders.filter((it) => it._id != order._id);
          setOrders(remainingItems);
          setPendingOrders(
            remainingItems.filter((ord) => ord.orderStatus === "pending")
          );
          setCompletedOrders(
            remainingItems.filter((ord) => ord.orderStatus === "completed")
          );
        }
      });
  };

  useEffect(() => {
    if (seller) {
      fetch(`http://localhost:5000/seller/order/${user.uid}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    } else {
      fetch(`http://localhost:5000/order/${user.uid}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, []);

  useEffect(() => {
    setPendingOrders(orders.filter((order) => order.orderStatus === "pending"));
    setCompletedOrders(
      orders.filter((order) => order.orderStatus === "completed")
    );
  }, [orders, setOrders]);

  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={8} md={12} className="text-center me-5">
        {/* ---------------------- completed orders list------------------- */}
        <div>
          <h4 className="my-4">
            <p className="d-inline">
              Status: <p className="d-inline text-success">Delivered </p>
            </p>
            <p className="d-inline ms-5">
              Items:{" "}
              <p className="text-primary d-inline ms-2">
                {completedOrders.length ? completedOrders.length : 0}
              </p>
            </p>
          </h4>

          <hr className="border border-secondary" />

          <div>
            {completedOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              ></OrderCard>
            ))}
          </div>
        </div>

        {/* ------------------------pending orders list---------------------- */}
        <div>
          <h4 className="my-4">
            <p className="d-inline">
              Status: <p className="d-inline text-danger">Pending </p>
            </p>
            <p className="d-inline ms-5">
              Items:{" "}
              <p className="text-primary d-inline ms-2">
                {pendingOrders.length ? pendingOrders.length : 0}
              </p>
            </p>
          </h4>

          <hr className="border border-secondary" />

          <div>
            {pendingOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              ></OrderCard>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Orders;
