import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import WishCards from "../../components/WishCards";
import { AuthContext } from "../../contexts/AuthProvider";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

  const handleDelete = (item) => {
    fetch(`http://localhost:5000/deleteWishlistedProduct/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.deletedCount > 0) {
          const remainingItems = wishlist.filter((it) => it._id != item._id);
          setWishlist(remainingItems);
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/wishlist/${user.uid}`)
      .then((res) => res.json())
      .then((data) => setWishlist(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={8} md={12}>
        <h3 className="text-center text-primary mt-3">
          Wish List Items:{wishlist.length}
        </h3>
        <div className="my-4 w-100">
          <WishCards
            fishData={wishlist}
            handleDelete={handleDelete}
          ></WishCards>
        </div>
      </Col>
    </Row>
  );
}

export default WishList;
