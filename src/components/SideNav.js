import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "./SideNav.css";

function SideNav() {
  const { user, seller } = useContext(AuthContext);

  let activeStyle = {
    backgroundColor: "#e1f5fe",
  };

  return (
    <ButtonGroup vertical className="nav-container">
      {seller ? (
        <>
          {/* ---------------------------------Navigation for SEller------------------- */}
          <NavLink
            className="nav-button pt-3"
            to={`/sellerAccount/${user.uid}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Account
          </NavLink>
          <NavLink
            className="nav-button pt-3"
            to="/order"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Orders
          </NavLink>

          <NavLink
            className="nav-button pt-3"
            to="/addProduct"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Add Product
          </NavLink>
        </>
      ) : (
        <>
          {/* ---------------------------------navigation for BUYER----------------------- */}{" "}
          <NavLink
            className="nav-button pt-3"
            to={`/account/${user.uid}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Account
          </NavLink>
          <NavLink
            className="nav-button pt-3"
            to="/order"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Orders History
          </NavLink>
          <NavLink
            className="nav-button pt-3"
            to={`/cart/${user.uid}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Cart
          </NavLink>
          <NavLink
            className="nav-button pt-3"
            to="/wishlist"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My WishList
          </NavLink>
        </>
      )}
    </ButtonGroup>
  );
}

export default SideNav;
