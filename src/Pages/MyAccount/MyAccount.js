import React from "react";
import { Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import BuyerProfile from "../../components/BuyerProfile/BuyerProfile";
import SideNav from "../../components/SideNav";

function MyAccount() {
  const currentUser = useLoaderData();
  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={6} md={12}>
        <BuyerProfile currentUser={currentUser}></BuyerProfile>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default MyAccount;
