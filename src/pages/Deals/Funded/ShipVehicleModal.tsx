import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Modal, { ModalProps } from "@/components/Modal";
import Space from "@/components/Space";
import { Deals } from "@/types/deals";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  List,
  Row,
} from "reactstrap";
import styles from "./styles.module.scss";

interface ShipFormProps {
  isOpen: ModalProps["isOpen"];
  toggle: ModalProps["toggle"];
  isLoading: boolean;
}
interface ShipVehiclModalProps {
  deal: Deals;
}

const ShipForm: React.FC<ShipFormProps> = ({ isOpen, isLoading, toggle }) => {
  const onFundDeal = () => {
    console.log("okkk");
  };

  return (
    <Modal
      title={
        <>
          <p>Set Up Shipping</p>
          <h6>Dates: June 5, 2022</h6>
        </>
      }
      className={styles.bordertitle}
      filledHeader
      isOpen={isOpen}
      toggle={toggle}
      okText="SET UP SHIPPING"
      onCancel={toggle}
      okButtonProps={{
        type: "submit",
        isLoading,
        loaderSize: "sm",
      }}
    >
      <h5 className="py-2">Sold Vehicle</h5>
      <Form
        initialValues={{
          name: "",
          address: "",
          billingaddress: "",
          contactphone: "",
          email: "",
          business: "",
          website: "",
        }}
        onSubmit={onFundDeal}
      >
        <Card className={styles.card}>
          <CardBody tabId="1">
            <CardTitle>BUYER DETAILS</CardTitle>
            <CardText>
              <List type="unstyled text-muted">
                <Row className={styles.textChange}>
                  <Col>Name:</Col>
                  <Col className="sm-6">
                    <Input label="" name="name" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Address:</Col>
                  <Col>
                    <Input label="" name="address" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Billing Address:</Col>
                  <Col>
                    <Input label="" name="billingaddress" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Contact Phone:</Col>
                  <Col>
                    <Input label="" name="contactphone" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Email:</Col>
                  <Col>
                    <Input label="" name="email" />
                  </Col>
                </Row>
              </List>
            </CardText>
            <CardSubtitle>DEALER DETAILS</CardSubtitle>
            <CardText>
              <List type="unstyled text-muted">
                <Row className={styles.textChange}>
                  <Col>Business:</Col>
                  <Col className="sm-6">
                    <Input label="" name="business" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Address:</Col>
                  <Col>
                    <Input label="" name="address" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Website:</Col>
                  <Col>
                    <Input label="" name="website" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Contact Phone:</Col>
                  <Col>
                    <Input label="" name="contactphone" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Email:</Col>
                  <Col>
                    <Input label="" name="email" />
                  </Col>
                </Row>
              </List>
            </CardText>
          </CardBody>
        </Card>
        <h5 className="py-2">Trade-In Shipping</h5>
        <Card className={styles.card}>
          <CardBody>
            <CardTitle>DEALER DETAILS</CardTitle>
            <CardText>
              <List type="unstyled text-muted">
                <Row className={styles.textChange}>
                  <Col>Business:</Col>
                  <Col className="sm-6">
                    <Input label="" name="business" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Address:</Col>
                  <Col>
                    <Input label="" name="address" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Website:</Col>
                  <Col>
                    <Input label="" name="website" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Contact Phone:</Col>
                  <Col>
                    <Input label="" name="contactphone" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Email:</Col>
                  <Col>
                    <Input label="" name="email" />
                  </Col>
                </Row>
              </List>
            </CardText>
            <CardSubtitle>BUYER DETAILS</CardSubtitle>
            <CardText>
              <List type="unstyled text-muted">
                <Row className={styles.textChange}>
                  <Col>Name:</Col>
                  <Col className="sm-6">
                    <Input label="" name="name" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Address:</Col>
                  <Col>
                    <Input label="" name="address" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Billing Address:</Col>
                  <Col>
                    <Input label="" name="billingaddress" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Contact Phone:</Col>
                  <Col>
                    <Input label="" name="contactphone" />
                  </Col>
                </Row>
                <Row className={styles.textChange}>
                  <Col>Email:</Col>
                  <Col>
                    <Input label="" name="email" />
                  </Col>
                </Row>
              </List>
            </CardText>
          </CardBody>
        </Card>
      </Form>
    </Modal>
  );
};

const ShipVehicleModal: React.FC<ShipVehiclModalProps> = ({ deal }) => {
  const [showShipModal, setShowShipModal] = useState(false);
  const toggleShipModal = () => {
    setShowShipModal((prev) => !prev);
  };
  return (
    <>
      <Space align="center" justify="center" size="small">
        <Button size="sm" onClick={toggleShipModal}>
          Ship
        </Button>
      </Space>
      <ShipForm
        isOpen={showShipModal}
        toggle={toggleShipModal}
        isLoading={false}
      />
    </>
  );
};
export default ShipVehicleModal;
