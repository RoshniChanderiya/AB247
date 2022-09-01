import { IconEdit, IconPlay, SliderNext, SliderPreview } from "@/assets/images";
import Button from "@/components/Button";
import classNames from "classnames";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import ContactNumberFooter from "../ContactNumberFooter";
import styles from "./styles.module.scss";

const Summary = () => {
  var settings = {
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
  return (
    <>
      <Row>
        <Col lg={4}>
          <Row className={classNames(styles.summaryContainer)}>
            <Col lg={12} className="d-flex">
              <h2 className={styles.profileHeading}>
                Dealership Account Profile
              </h2>
              <img src={IconEdit} alt="edit" className={styles.editIcon} />
            </Col>

            <Col lg={12} className="mt-3">
              <h5>
                Dealer Account Number
                <br />
                <span>BW-2222</span>
              </h5>
            </Col>
            <Col lg={12} className="mt-3">
              <h5>
                Dealer Business Name
                <br />
                <span>Fleming Island BMW</span>
              </h5>
            </Col>
            <Col lg={12} className="mt-3">
              <h5>
                Website
                <br />
                <span>www.cardealership.com</span>
              </h5>
            </Col>
            <Col lg={12} className="mt-3">
              <h5>
                Company Email Address
                <br />
                <span>info@cardship.com</span>
              </h5>
            </Col>
            <Row className="mt-3">
              <Col lg={6}>
                <h5>
                  Office Phone
                  <br />
                  <span>214-234-3223</span>
                </h5>
              </Col>
              <Col lg={6}>
                <h5>
                  Ext
                  <br />
                  <span>001</span>
                </h5>
              </Col>
            </Row>
            <Col lg={12} className="mt-3">
              <h5>
                Address Line 1<br />
                <span>163 Carolynes Circle</span>
              </h5>
            </Col>
            <Row className="mt-3">
              <Col lg={5}>
                <h5>
                  City
                  <br />
                  <span>Fleming Icland</span>
                </h5>
              </Col>
              <Col lg={4}>
                <h5>
                  State
                  <br />
                  <span>Florida (FL)</span>
                </h5>
              </Col>
              <Col lg={3}>
                <h5>
                  Zip Code
                  <br />
                  <span>32003</span>
                </h5>
              </Col>
            </Row>
          </Row>
          <Row className={classNames(styles.communicationPreferences)}>
            <Col lg={12}>
              <h4>Communication Preferences</h4>
              <div
                className={classNames(
                  styles.communicationPreferencesContainer,
                  "d-flex flex-row justify-content-between"
                )}
              >
                <Row>
                  <Col lg={12} className="d-flex my-2 pt-3 mx-5">
                    {/* <ToggleSwitch checked={checked} onToggle={onToggle} /> */}
                    <span>Receive alerts on mobile app</span>
                  </Col>
                  <Col lg={12} className="d-flex my-2 mx-5">
                    {/* <ToggleSwitch checked={checked} onToggle={onToggle} /> */}
                    <span>Receive alerts by email</span>
                  </Col>
                  <Col lg={12} className="d-flex my-2 pb-3  mx-5">
                    {/* <ToggleSwitch checked={checked} onToggle={onToggle} /> */}
                    <span>Receive marketing emails</span>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Col lg={12} className="d-flex">
            <h4 className={styles.feesHeading}>Fees and Account Access</h4>
            <img src={IconEdit} alt="edit" className={styles.feesEdit} />
          </Col>
          <Row className={classNames(styles.accountContainer, "mt-4")}>
            <Row className="mt-3">
              <Col lg={6}>
                <h5>
                  $500
                  <br />
                  <span>Dealer Fee</span>
                </h5>
              </Col>
              <Col lg={6}>
                <h5>
                  $5299
                  <br />
                  <span>Title Processing Fee</span>
                </h5>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <h5>
                  TK-1000124
                  <br />
                  <span>DMS Account Number</span>
                </h5>
              </Col>
              <Col lg={6}>
                <h5>
                  Tekion
                  <br />
                  <span>DMS Company Name</span>
                </h5>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <h5>
                  NextGear Capital
                  <br />
                  <span>Floorplan Company</span>
                </h5>
              </Col>
              <Col lg={6}>
                <h5>
                  jody@nextgear.com
                  <br />
                  <span>Floorplan Email</span>
                </h5>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <h5>
                  122345678
                  <br />
                  <span>Wire Account Number</span>
                </h5>
              </Col>
              <Col lg={6}>
                <h5>
                  08798687576 <br />
                  <span>Wire Routing Number</span>
                </h5>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col lg={4}>
          <Col lg={12}>
            <h3 className={styles.downloadAppHeading}>
              Download the BidWizer Alert App
            </h3>
          </Col>
          <Col className="px-5 mt-2">
            <div className={styles.downloadAppContainer}>
              <Row>
                <Col lg={6}></Col>
                <Col lg={6} className={styles.buttons}>
                  <Button>Apple iOS</Button>
                  <h4 className={styles.buttonSeparate}>or</h4>
                  <Button>Android</Button>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={12} className="px-5">
            <Slider {...settings}>
              {videos.map((video) => (
                <li className={styles.videoContainer}>
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
    </>
  );
};

export default Summary;
