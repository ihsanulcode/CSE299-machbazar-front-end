import React from "react";
import { Container } from "react-bootstrap";
import SellerFishCard from "./SellerFishCard";
import "./NewArrivalFishes/NewArrival.css";

function SellerProducts({ fishData, title, handleDelete }) {
  return (
    <Container className="cards-container">
      <div className="d-flex justify-content-start">
        <h3>{title}</h3>
      </div>
      <hr className="border border-secondary mt-0" />
      <div className="fish-cards">
        {fishData.map((fish) => (
          <SellerFishCard
            key={fish.id}
            fish={fish}
            handleDelete={handleDelete}
          ></SellerFishCard>
        ))}
      </div>
    </Container>
  );
}

export default SellerProducts;
