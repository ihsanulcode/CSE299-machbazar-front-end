import React, { useEffect, useState } from "react";
import { useContext } from "react";
import SellerProducts from "../../components/SellerProducts";
import { AuthContext } from "../../contexts/AuthProvider";

function SellerHome() {
  const [yourProducts, setYourProducts] = useState([]);
  const { user } = useContext(AuthContext);

  const handleDelete = (fish) => {
    const agree = window.confirm(
      `Are you sure you want to delete: ${fish.name}`
    );
    if (agree) {
      fetch(`http://localhost:5000/deleteProduct/${fish._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.deletedCount > 0) {
            alert("item deleted successfully");
            const remainingItems = yourProducts.filter(
              (it) => it._id != fish._id
            );
            setYourProducts(remainingItems);
          }
        });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/products/${user.uid}`)
      .then((res) => res.json())
      .then((data) => setYourProducts(data));
  }, []);
  return (
    <div style={{ minHeight: "520px" }}>
      <SellerProducts
        fishData={yourProducts}
        title="Your Products"
        handleDelete={handleDelete}
      ></SellerProducts>
    </div>
  );
}

export default SellerHome;
