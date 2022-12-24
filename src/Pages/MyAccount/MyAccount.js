import React from "react";
import { Col, Row } from "react-bootstrap";
import BuyerProfile from "../../components/BuyerProfile/BuyerProfile";
import SideNav from "../../components/SideNav";

function MyAccount() {
  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={6} md={12}>
        <BuyerProfile></BuyerProfile>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default MyAccount;
