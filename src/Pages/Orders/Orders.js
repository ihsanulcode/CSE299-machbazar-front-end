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
              orders.filter((order) => order.orderStatus === "pending")
            );
            setCompletedOrders(
              orders.filter((order) => order.orderStatus === "completed")
            );
          }
        });
    }
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
    console.log(pendingOrders);
  }, [orders, setOrders]);
  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={8} md={12} className="text-center">
        {/* ---------------------- completed orders list------------------- */}
        <div>
          <h4 className="my-4">
            Your Order ID: 3422534{"   "}
            <p className="text-primary d-inline ms-2"> items</p>
          </h4>
          <h4>
            status: <p className="text-success d-inline">Completed</p>
          </h4>
          <div>
            {completedOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                handleDelete={handleDelete}
              ></OrderCard>
            ))}
          </div>
        </div>
        {/* ------------------------pending orders list---------------------- */}
        <div>
          <h4 className="my-4">
            Your Order ID: 3422534{"   "}
            <p className="text-primary d-inline ms-2"> items</p>
          </h4>
          <h4>
            status: <p className="text-danger d-inline">Pending</p>
          </h4>
          <div>
            {pendingOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                handleDelete={handleDelete}
              ></OrderCard>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Orders;
