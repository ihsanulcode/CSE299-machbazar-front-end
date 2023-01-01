import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AddItem from "../../components/AddItem";
import SideNav from "../../components/SideNav";
import { AuthContext } from "../../contexts/AuthProvider";

function AddProduct() {
  const { user } = useContext(AuthContext);

  return (
    <Row>
      <Col>
        <SideNav></SideNav>
      </Col>
      <Col lg={6} md={12}>
        <AddItem user={user}></AddItem>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default AddProduct;
