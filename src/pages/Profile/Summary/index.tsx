import { IconEdit, IconPlay, SliderNext, SliderPreview } from "@/assets/images";
import Button from "@/components/Button";
import Space from "@/components/Space";
import Switch from "@/components/Switch";
import { OnboardingContext } from "@/providers/OnboardingProvider";
import { Dealer } from "@/types/dealer";
import { formatNumber } from "@/utils/NumberFomatter";
import classNames from "classnames";
import get from "lodash/get";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider, { Settings as SliderSettings } from "react-slick";
import { Col, Row } from "reactstrap";
import ContactNumberFooter from "../../Onboarding/ContactNumberFooter";
import styles from "./styles.module.scss";

const sliderSettings: SliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  dotsClass: styles.button__bar,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SliderPreview color="#17C0CC" size={50} />,
  prevArrow: <SliderNext color="#17C0CC" size={50} />,
};

const videos = [
  {
    title: "DB 101 Video",
  },
  {
    title: "AU 101 Video",
  },
  {
    title: "WS 101 Video",
  },
];

const LabelAndValue: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  reverse?: boolean;
}> = ({ label, value, reverse }) => {
  return (
    <div>
      <label
        className={classNames(styles.label, {
          [styles.reverse]: reverse,
        })}
      >
        {label}
      </label>
      <span
        className={classNames(styles.value, {
          [styles.reverse]: reverse,
        })}
      >
        {value}
      </span>
    </div>
  );
};

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const { dealer } = useContext(OnboardingContext);
  const [isOpen, setIsOpen] = useState(false);
  const dealerPayload: Dealer["_source"]["payload"] = get(
    dealer,
    "_source.payload",
    {}
  );
  const mobResponsiveToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Row className={styles.summaryContainer}>
        <Col lg={4}>
          <Row className="p-3">
            <Col lg={12} className="d-flex">
              <h2 className={styles.heading}>Dealership Account Profile</h2>
              <img
                src={IconEdit}
                alt="edit"
                className={styles.editIcon}
                onClick={() =>
                  navigate(`/onboarding/business?dealer=${dealer?._id}`)
                }
              />
            </Col>

            <Col lg={12} className="mt-3">
              <LabelAndValue label="Dealer Account Number" value="BW-2222" />
            </Col>
            <Col lg={12} className="mt-3">
              <LabelAndValue
                label="Dealer Business Name"
                value={dealerPayload.dealer_name}
              />
            </Col>
            <Col lg={12} className="mt-3">
              <LabelAndValue label="Website" value={dealerPayload.dealer_url} />
            </Col>
            <Col lg={12} className="mt-3">
              <LabelAndValue
                label="Company Email Address"
                value={dealerPayload.dealer_email}
              />
            </Col>
            <Col lg={12}>
              <LabelAndValue
                label="Office Phone"
                value={dealerPayload.dealer_phone}
              />
            </Col>
            <Col lg={12} className="mt-3">
              <LabelAndValue
                label="Address Line 1"
                value={dealerPayload.dealer_street}
              />
            </Col>
            <Col lg={12} className="mt-3">
              <div className={styles.address}>
                <LabelAndValue label="City" value={dealerPayload.dealer_city} />
                <LabelAndValue
                  label="State"
                  value={dealerPayload.dealer_state}
                />
                <LabelAndValue
                  label="Zip Code"
                  value={dealerPayload.dealer_zipcode}
                />
              </div>
            </Col>
          </Row>
          <Row className={styles.communicationPreferences}>
            <Col lg={12} className="d-none d-sm-block">
              <h4>Communication Preferences</h4>
              <div className={styles.communicationPreferencesContainer}>
                <Space align="center">
                  <Switch />
                  <span className={styles.notificationLabel}>
                    Receive alerts on mobile app
                  </span>
                </Space>
                <Space align="center">
                  <Switch />
                  <span className={styles.notificationLabel}>
                    Receive alerts by email
                  </span>
                </Space>
                <Space align="center">
                  <Switch />
                  <span className={styles.notificationLabel}>
                    Receive marketing emails
                  </span>
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <div className={classNames(styles.accountContainer, "mt-4")}>
            <div className="d-flex">
              <h2 className={styles.heading}>Fees and Account Access</h2>
              <img
                src={IconEdit}
                alt="edit"
                className={styles.editIcon}
                onClick={() =>
                  navigate(`/onboarding/account?dealer=${dealer?._id}`)
                }
              />
            </div>
            <Row className="mt-3">
              <Col lg={6}>
                <LabelAndValue
                  label={formatNumber(dealerPayload.dealer_fees)}
                  value="Dealer Fee"
                  reverse
                />
              </Col>
              <Col lg={6}>
                <LabelAndValue
                  label={formatNumber(dealerPayload.processing_fees)}
                  value="Title Processing Fee"
                  reverse
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <LabelAndValue
                  label={dealerPayload.dms_account_number}
                  value="DMS Account Number"
                  reverse
                />
              </Col>
              <Col lg={6}>
                <LabelAndValue
                  label={dealerPayload.dms_name}
                  value="DMS Company Name"
                  reverse
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <LabelAndValue
                  label={dealerPayload.floorplan_company}
                  value="Floorplan Company"
                  reverse
                />
              </Col>
              <Col lg={6}>
                <LabelAndValue
                  label={dealerPayload.floorplan_company_email}
                  value="Floorplan Email"
                  reverse
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <LabelAndValue
                  label={dealerPayload.bank?.account_number}
                  value="Wire Account Number"
                  reverse
                />
              </Col>
              <Col lg={6}>
                <LabelAndValue
                  label={dealerPayload.bank?.routing_number}
                  value="Wire Routing Number"
                  reverse
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4} className="d-none d-sm-block">
          <Col lg={12}>
            <h3 className={styles.downloadAppHeading}>
              Download the BidWizer Alert App
            </h3>
          </Col>
          <Col className="px-5 mt-2">
            <div className={styles.downloadAppContainer}>
              <div className={styles.buttons}>
                <Button>Apple iOS</Button>
                <h4 className={styles.buttonSeparate}>
                  <i>or</i>
                </h4>
                <Button>Android</Button>
              </div>
            </div>
          </Col>
          <Col lg={12} className="px-5 d-none d-sm-block">
            <Slider {...sliderSettings}>
              {videos.map((video) => (
                <li className={styles.videoContainer} key={video.title}>
                  <div>
                    <img src={IconPlay} className={styles.video} alt="" />
                    <h2 className={styles.title}>{video.title}</h2>
                  </div>
                </li>
              ))}
            </Slider>
          </Col>
        </Col>
      </Row>
      <Row className="mt-5">
        <ContactNumberFooter />
      </Row>
      <Row className={styles.responsiveBtn}>
        {/* <Button>
          VIEW DEARLERSHIP
        </Button> */}
      </Row>
    </>
  );
};

export default Summary;
