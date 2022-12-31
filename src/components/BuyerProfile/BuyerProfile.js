import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthProvider";
import "./BuyerProfile.module.css";

function BuyerProfile() {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);

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
    <div className="container-body">
      <div className="div-clear"></div>

      <Container>
        <form action="#" onSubmit={handleSubmit}>
          <h3 className="mt-4">Buyer Information</h3>
          <hr />
          <label for="name">
            <b>Full Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={currentUser.name}
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
            name="phone"
            defaultValue={currentUser.phone}
            onChange={handleOnChange}
            required
          />
          <br />
          <h3>Shipping Address</h3>
          <hr />
          <textarea
            name="address"
            id=""
            cols="60"
            rows="10"
            required
            defaultValue={currentUser.address}
            onChange={handleOnChange}
            placeholder="Enter Shipping Address"
          ></textarea>
          <div className="my-3">
            <button type="submit" className="btn btn-light border-secondary">
              Update
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default BuyerProfile;
