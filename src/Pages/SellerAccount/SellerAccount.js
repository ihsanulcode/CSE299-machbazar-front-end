import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import "../../components/BuyerProfile/BuyerProfile.module.css";
import { AuthContext } from "../../contexts/AuthProvider";

function SellerAccount() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [values, setValues] = useState({
    name: user.displayName,
    email: user.email,
    phone: currentUser.phone,
    address: "",
  });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);

    fetch(`http://localhost:5000/user/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("user added successfully");
          event.target.reset();
        }
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        values.phone = currentUser.phone;
        values.address = currentUser.address;
        values.name = currentUser.name;
        values.email = currentUser.email;
      });
  }, []);
  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={6} md={12}>
        <Container>
          <form action="#" onSubmit={handleSubmit}>
            <h3 className="mt-4">Seller Information</h3>
            <hr />
            <label for="name">
              <b>Full Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={user.displayName}
              name="name"
            />
            <br />
            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter your E-mail"
              value={user.email}
              name="email"
            />
            <br />
            <label for="number">
              <b>Phone Number</b>
            </label>
            <input
              type="text"
              placeholder="Enter your Contact No."
              defaultValue={currentUser.phone}
              name="phone"
              onChange={handleOnChange}
              required
            />
            <br />
            <h3>Shop Address</h3>
            <hr />
            <textarea
              name="address"
              defaultValue={currentUser.address}
              cols="60"
              rows="10"
              required
              onChange={handleOnChange}
              placeholder="Enter Shop Address"
            ></textarea>
            <div className="my-3">
              <button type="submit" className="btn btn-light border-secondary">
                Update
              </button>
            </div>
          </form>
        </Container>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default SellerAccount;
