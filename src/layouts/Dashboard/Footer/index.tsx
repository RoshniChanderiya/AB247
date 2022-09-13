import Icon, {
  IconFB,
  IconInstagram,
  IconLinkedin,
  IconPinterest,
  IconTwitter,
} from "@/assets/images";
import Logo from "@/assets/images/logos";
import CompanyName from "@/components/CompanyName";
import { COMPANY_CONTACT_NUMBER, COMPANY_EMAIL } from "@/constants";
import classNames from "classnames";
import dayjs from "dayjs";
import { Col, Container, Row } from "reactstrap";
import styles from "./styles.module.scss";

interface FooterProps {
  showMetaData?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showMetaData }) => (
  <footer className="mt-0 mt-sm-4">
    <Container fluid>
      <Row>
        {showMetaData && (
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
                  styles.footerLogoContainer,
                  "text-center",
                  "text-lg-start"
                )}
              >
                <Logo variant="footer" className={styles.footerLogo} />
                <p
                  className={classNames(
                    "text-white",
                    "my-3",
                    styles.footerText
                  )}
                >
                  <CompanyName /> was founded in 2017 and has now moved into the
                  automotive market as a disruptive technology. This
                  revolutionary platform will change the way people buy and sell
                  cars forever.
                </p>
                <p className={styles.footerText}>Learn more</p>
              </div>
              <div className="text-center text-lg-start">
                <h5 className={styles.footerSubHeading}>
                  About <CompanyName />
                </h5>
                <ul className="px-0">
                  <li className={classNames("my-2", styles.footerListItem)}>
                    About Us
                  </li>
                  <li className={styles.footerListItem}>Contact </li>
                </ul>
              </div>

              <div className="text-center text-lg-start">
                <h5 className={classNames(styles.footerSubHeading, "mb-2")}>
                  Contact Info
                </h5>
                <p className={styles.footerText}>
                  <CompanyName showInc />
                </p>
                <p>417 5th Avenue</p>
                <p>Indialantic, Fl. 32903</p>
                <p className="mt-5">{COMPANY_CONTACT_NUMBER}</p>
                <p>{COMPANY_EMAIL}</p>
              </div>
            </div>
            <h1
              className={classNames(
                styles.footerTagLine,
                "title text-center mt-5 text-white"
              )}
            >
              This Bid's For You.
            </h1>
          </div>
        )}

        <Row sm={12} className={classNames(styles.tagline, "p-3 m-0")}>
          <Col lg={6} sm={12} className="text-center text-lg-start">
            <p className={styles.footCopyright}>
              Copyright &copy; {dayjs().get("year")}
              <CompanyName showInc /> All Rights Reserved.
            </p>
          </Col>
          <Col lg={6} sm={12} className="text-center text-lg-end">
            <div className={styles.socialLinks}>
              <Icon className={styles.socialIconImage} alt="fb" icon={IconFB} />
              <Icon
                className={styles.socialIconImage}
                alt="twitter"
                icon={IconTwitter}
              />
              <Icon
                className={styles.socialIconImage}
                alt="linkedin"
                icon={IconLinkedin}
              />
              <Icon
                className={styles.socialIconImage}
                alt="pinterest"
                icon={IconPinterest}
              />
              <Icon
                className={styles.socialIconImage}
                alt="instagram"
                icon={IconInstagram}
              />
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  </footer>
);

export default Footer;
