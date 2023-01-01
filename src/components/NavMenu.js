import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "./MainNav/MainNav.css";

function JohnDoe({ user, handleLogout }) {
  const { seller } = useContext(AuthContext);
  return (
    <div className="dropdown px-3 ms-2">
      <button
        className="btn border-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {user.displayName}
      </button>
      {seller ? (
        <ul className="dropdown-menu">
          <li>
            <Link
              className="dropdown-item text-decoration-none"
              to={`/sellerHome`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item text-decoration-none"
              to={`/sellerAccount/${user.uid}`}
            >
              My Account
            </Link>
          </li>
          <li>
            <Link className="dropdown-item text-decoration-none" to={`/order`}>
              My Orders
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item text-decoration-none"
              to={`/addProduct`}
            >
              Add Product
            </Link>
          </li>
          <li>
            <button
              className="btn btn-light w-100 text-start"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </li>
        </ul>
      ) : (
        <ul className="dropdown-menu">
          <li>
            <Link
              className="dropdown-item text-decoration-none"
              to={`/account/${user.uid}`}
            >
              My Account
            </Link>
          </li>
          <li>
            <Link className="dropdown-item text-decoration-none" to={`/order`}>
              My Orders
            </Link>
          </li>

          <li>
            <Link
              className="dropdown-item text-decoration-none"
              to={`/cart/${user.uid}`}
            >
              My Cart
            </Link>
          </li>
          <li>
            <Link className="dropdown-item text-decoration-none" to="/wishlist">
              My WishList
            </Link>
          </li>
          <li>
            <button
              className="btn btn-light w-100 text-start"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default JohnDoe;
