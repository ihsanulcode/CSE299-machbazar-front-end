import React from "react";
import { Container } from "react-bootstrap";
import WishCard from "./WishCard";
import "./WishCards.css";

function WishCards({ fishData, handleDelete }) {
  console.log(fishData);
  return (
    <Container className="wishCard-container">
      <hr className="border border-secondary mt-0" />
      <div className="wish-cards">
        {fishData.map((fish) => (
          <WishCard
            key={fish.id}
            fish={fish}
            handleDelete={handleDelete}
          ></WishCard>
        ))}
      </div>
    </Container>
  );
}

export default WishCards;
