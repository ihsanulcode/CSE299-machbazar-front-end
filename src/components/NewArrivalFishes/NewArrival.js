import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import FishCard from "../FishCard/FishCard";
import "./NewArrival.css";

function NewArrival({ title, fishData }) {
  const [fishes, setFishes] = useState(fishData);
  console.log(fishData);

  const handleViewAll = () => {
    setFishes(fishData);
  };

  useEffect(() => {
    if (fishData.length > 6) {
      setFishes(fishData.slice(0, 6));
    }
  }, []);
  return (
    <div>
      <Container className="cards-container">
        <div className="d-flex justify-content-between">
          <h3>{title}</h3>
          <button
            className="btn text-primary btn-light"
            onClick={handleViewAll}
          >
            view all
          </button>
        </div>
        <hr className="border border-secondary mt-0" />
        <div className="fish-cards">
          {fishes.map((fish) => (
            <FishCard key={fish.id} fish={fish}></FishCard>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default NewArrival;
