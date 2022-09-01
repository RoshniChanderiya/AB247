import Button from "@/components/Button";
import Form from "@/components/Form";
import ThemeInput from "@/components/ThemeInput";
import classNames from "classnames";
import { useState } from "react";
import { PlusCircle } from "react-feather";
import { Col, Row } from "reactstrap";
import ContactNumberFooter from "../ContactNumberFooter";
import styles from "./styles.module.scss";

interface RepresentativesData {
  handleNextStepClick: () => void;
}
const Representatives: React.FC<RepresentativesData> = ({
  handleNextStepClick,
}) => {
  const [respresentatives, setSespresentatives] = useState([{}]);

  const addNewRepresentative = () => {
    setSespresentatives([...respresentatives, {}]);
  };

  const onSubmit = () => {
    handleNextStepClick();
  };
  return (
    <Form initialValues={{}} onSubmit={onSubmit}>
      <Row>
        {respresentatives.map(() => (
          <Col lg={4} className="mt-4">
            <Row>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="fullName"
                  label="Full Name"
                  placeholder="Larry David"
                />
              </Col>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="businessTitle"
                  label="Business Title / Administrator"
                  placeholder="Select Title"
                  type="select"


/>
              </Col>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="emailAddress"
                  label="Email Address"
                  placeholder="Larry.David@CarDeal.com"
                />
              </Col>
              <Row>
                <Col lg={8}>
                  <ThemeInput
                    variant="default"
                    showRequiredMark
                    boldLabel
                    control="themed"
                    name="PhoneDirectLine"
                    label="Phone Direct Line"
                    placeholder="800-555-1234"
                  />
                </Col>
                <Col lg={4}>
                  <ThemeInput
                    variant="default"
                    boldLabel
                    control="themed"
                    name="ext"
                    label="EXT"
                    placeholder="540"
                  />
                </Col>
              </Row>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="mobile"
                  label="Mobile / Other"
                  placeholder="954-412-0087"
                />
              </Col>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="biddingPreference"
                  label="Bidding Preference"
                  placeholder="Select Bidding Preference"
                  type="select"
                />
              </Col>

              <Col sm={12}>
                <Button type="submit" className={classNames("w-50", "mt-5")}>
                  Add
                </Button>
              </Col>
            </Row>
          </Col>
        ))}
        <Col
          lg={4}
          className={classNames(
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "px-5",
            "mt-4",
            styles.addRepresentative
          )}
        >
          <div onClick={addNewRepresentative}>
            <div
              className={classNames(
                styles.plusCircle,
                "d-flex",
                "align-items-center",
                "justify-content-center",
                "mx-5"
              )}
            >
              <PlusCircle width="120px" height="120px" />
            </div>
            <div
              className={classNames(
                styles.plusCircleContent,
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
            >
              <p>
                Click To Add New <br /> Dealer Representative
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={6}>
          <ContactNumberFooter />
        </Col>
        <Col lg={6}>
          <Button
            filled
            type="submit"
            className={classNames(styles.updatebtn, "w-25", "btn-save")}
          >
            UPDATE
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Representatives;
