import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import NavMenu from "../NavMenu";
import "./MainNav.css";

function MainNav() {
  const [searchedProductName, setSearchedProductName] = useState("");
  const [fishCategories, setFishCategories] = useState([]);

  const navigate = useNavigate();

  // -------------------------handling user state(logged in or logged out)----------------
  const { user, logOut, setSeller, seller, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setSeller(false);
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  // ------------------------handling product search------------------
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setFishCategories(data));
  }, []);

  const handleSetSearchedProductName = (event) => {
    setSearchedProductName(event.target.value);
  };

  const handleProductSearch = () => {
    navigate(`/categories/${searchedProductName}`);
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="main-nav mt-4 shadow-sm">
      <nav>
        <Container className="d-flex justify-content-between align-items-center">
          <div className="navbarBrand ">
            {seller ? (
              <Link to="/sellerHome" className="text-decoration-none">
                <h2 className="fw-bold">Machbazar</h2>
              </Link>
            ) : (
              <Link to="/" className="text-decoration-none">
                <h2 className="fw-bold">Machbazar</h2>
              </Link>
            )}
          </div>
          <div className="searchfield d-flex">
            <input
              type="text"
              placeholder="search for products"
              id="product-search"
              onChange={handleSetSearchedProductName}
            />
            <button className="bg-white border-light">
              <FaSearch className="icon" onClick={handleProductSearch} />
            </button>
          </div>
          <div>
            {user?.uid ? (
              <NavMenu user={user} handleLogout={handleLogout}></NavMenu>
            ) : (
              <div className="d-none d-lg-block loginBlock mx-auto">
                <Link to="/login">Login</Link>
                <Link to="/register">Registration</Link>
              </div>
            )}
          </div>
        </Container>
      </nav>
    </div>
  );
}

export default MainNav;
