import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import FishCard from "../../components/FishCard/FishCard";
import "./SearchResult.css";
import "../../components/NewArrivalFishes/NewArrival.css";
import Pagination from "../../components/Pagination/Pagination";

function SearchResult() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);
  // const [fishData] = useState(useLoaderData());
  const fishData = useLoaderData();
  console.log(fishData);

  // ------------ getting current cards ---------------
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = fishData.slice(indexOfFirstCard, indexOfLastCard);

  // ------------------changing page handler--------------------
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  // -------------------changing page with arrows handler-----------
  const handleNextPaginate = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPaginate = () => setCurrentPage(currentPage - 1);

  return (
    <div className="search-result">
      <Container>
        <h3 className="mt-3">
          {fishData.length === 0 && <p>No fishes found!!!</p>}
        </h3>
        <h3 className="mt-3">{fishData[0]?.category}</h3>
        <hr />

        <div className="my-4 fish-cards">
          {currentCards.map((fish) => (
            <FishCard key={fish.id} fish={fish}></FishCard>
          ))}
        </div>
        <div>
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={fishData.length}
            handlePaginate={handlePaginate}
            handleNextPaginate={handleNextPaginate}
            handlePrevPaginate={handlePrevPaginate}
          ></Pagination>
        </div>
      </Container>
    </div>
  );
}

export default SearchResult;
