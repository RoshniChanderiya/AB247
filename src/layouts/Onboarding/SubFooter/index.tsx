import Logo from "@/assets/images/logos";
import { COMPANY_CONTACT_NUMBER, COMPANY_EMAIL } from "@/constants/generic";
import classNames from "classnames";
import { Container, Row } from "reactstrap";
import styles from "./styles.module.scss";

const SubFooter = () => (
  <footer className={styles.main}>
    <Container fluid>
      <Row>
        <div className={classNames("py-5", styles.footerWrapper)}>
          <div
            className={classNames(
              "d-lg-flex",
              "text-lg-start",
              "text-center",
              styles.footerTop
            )}
          >
            <div
              className={classNames(
                styles.footLogoImg,
                "text-center",
                "text-lg-start",
                "d-flex"
              )}
            >
              <div>
                <Logo variant="footer" />
                <p className="text-white my-3">
                  BidWizer was founded in 2018 and has now moved into the
                  automotive market as a disruptive technology. This
                  revolutionary platform will change the way people buy and sell
                  cars forever.
                </p>
                <p>Learn more</p>
              </div>
              <div
                className={classNames(
                  styles.footerMenu,
                  "text-center text-lg-start"
                )}
              >
                <h4>Footer Menu</h4>
                <ul>
                  <li>Advertising</li>
                  <li>Dealers</li>
                  <li>Corporate</li>
                  <li>Employment</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>

            <div className="text-center text-lg-start pt-5">
              <h5 className="mb-2">Contact Info</h5>
              <p>BidWizer.Inc</p>
              <p>417 5th Avenue</p>
              <p>Indialantic, Fl. 32903</p>
              <p className="mt-5">{COMPANY_CONTACT_NUMBER}</p>
              <p>{COMPANY_EMAIL}</p>
            </div>
          </div>
          <h1 className="title text-center mt-5 text-white">
            This Bid's For You.
          </h1>
        </div>
      </Row>
    </Container>
  </footer>
);

export default SubFooter;
