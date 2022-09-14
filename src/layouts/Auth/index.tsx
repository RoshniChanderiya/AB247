import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Sidebar from "./Sidebar";

const AuthLayout: React.FC = () => {
  return (
    <Row>
      <Col xl={5} lg={6} md={12} sm={12} className="d-none d-lg-block">
        <Sidebar />
      </Col>
      <Col xl={7} lg={6} md={12} sm={12}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;
