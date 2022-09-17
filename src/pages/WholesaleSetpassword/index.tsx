import React from "react";
import { Col, Row, Form, Button, Input } from "reactstrap";
import styles from "./styles.module.scss";
import classNames from "classnames";
const WholesaleSetpassword = () => {
  return (
    <>
      <Row className={styles.resetSection}>
        <div className={styles.resetInn}>
          <Col className={styles.resetLeftsection}>
            <div>
              <h3>Set Password</h3>
              <p
                className={classNames(
                  styles.text,
                  "d-flex justify-content-center font-weight-normal"
                )}
              ></p>
              <Col sm={12} className="mt-5 col-sm-mt-2">
                <Input
                  variant="teriary"
                  name="createpassword"
                  showRequiredMark
                  label="createpassword"
                  placeholder="create password"
                  className="my-4"
                />
              </Col>
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Enter Password"
                className="my-4"
              />
              <div>
                <Button type="submit">Verify & Continue</Button>
              </div>
            </div>
          </Col>
          <Col className={styles.resetRightsection}></Col>
        </div>
      </Row>
    </>
  );
};
export default WholesaleSetpassword;
