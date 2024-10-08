import React, { useEffect, useState } from "react";
import HeaderBody from "../../components/Header/HeaderBody/HeaderBody";
import MiniCard from "../../components/MiniCard/MiniCard";
import checkImage from "../../assets/check.png";
import delivery from "../../assets/delivery.png";
import cashon from "../../assets/cod.png";
import online from "../../assets/online-payment.png";
import { Container } from "react-bootstrap";
import NewArrival from "../../components/NewArrivalFishes/NewArrival";
import Explore from "../../components/Explore/Explore";
import "./Home.css";


function Home() {
  const [fishData, setFishData] = useState([]);
  const [seaFish, setSeaFish] = useState([]);
  const [dryFish, setDryFish] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setFishData(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered1 = data.filter(fish => {
          return fish.category === 'sea';
        });
        setSeaFish(filtered1);

        const filtered2 = data.filter(fish => {
          return fish.category === 'dry fish';
        });
        setDryFish(filtered2);
      });
  }, []);

  return (
    <div>
      {/* ---------- header section------------------------- */}
      <HeaderBody></HeaderBody>

      {/* -----------------mini cards section--------------------- */}
      <Container className="my-4 text-center">
        <div className="miniCard-container row cols-1 cols-md-2 cols-lg-3 g-2 g-lg-3 justify-items-center">
          <div className="col-12 col-md-6 col-lg-3">
            <MiniCard text={"Quality Product"} image={checkImage}></MiniCard>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <MiniCard text={"Free Shipping"} image={delivery}></MiniCard>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <MiniCard text={"Cash On Delivery"} image={cashon}></MiniCard>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <MiniCard text={"24/7 Support"} image={online}></MiniCard>
          </div>
        </div>
      </Container>

      {/* -------------------Fishes section----------------- */}
      <NewArrival title={"মাছের সমাহার"} fishData={fishData}></NewArrival>

      {/* -------------------------Category wise-------------- */}
      <NewArrival title={"শুটকি মাছ সমগ্র"} fishData={dryFish}></NewArrival>
      <NewArrival title={"সামুদ্রিক মাছ"} fishData={seaFish}></NewArrival>

      {/* ----------------------- Explore More section -------------------------- */}
      <Container className="my-5"><Explore></Explore></Container>
    </div>
  );
}

export default Home;
