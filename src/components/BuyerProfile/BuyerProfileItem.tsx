import classNames from "classnames";
import { Col } from "reactstrap";
import styles from "./styles.module.scss";

interface BuyerProfileItemProps {
  label: string;
  value: string;
}

const BuyerProfileItem: React.FC<BuyerProfileItemProps> = ({
  label,
  value,
}) => {
  return (
    <span className="d-flex">
      <Col lg={6} className={classNames(styles.field, "my-auto")}>
        {label}:
      </Col>
      <Col lg={6} className={classNames(styles.value)}>
        {value}
      </Col>
    </span>
  );
};

export default BuyerProfileItem;
