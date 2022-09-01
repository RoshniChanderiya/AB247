import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Sidebar from "./Sidebar";

const AuthLayout: React.FC = () => {
  return (
    <Row className="w-100">
      <Col sm={4} className="d-none d-lg-block">
        <Sidebar />
      </Col>
      <Col lg={8} sm={12} xs={12}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;
