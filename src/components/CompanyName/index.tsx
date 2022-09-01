import {
  COMPANY_FIRSTNAME,
  COMPANY_LASTNAME,
  COMPANY_NAME,
} from "@/constants/";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface CompanyNameProps {
  showInc?: boolean;
  className?: string;
  variant?: "bold" | "multi" | "trademark" | "withS";
}

const CompanyName: React.FC<CompanyNameProps> = ({
  showInc,
  className,
  variant,
}) => (
  <span
    className={classNames(styles.companyName, className, {
      [styles.bold]: variant === "bold",
    })}
  >
    {variant === "multi" ? (
      <>
        <span className={styles.firstName}>{COMPANY_FIRSTNAME}</span>
        {COMPANY_LASTNAME}
      </>
    ) : (
      <>{COMPANY_NAME}</>
    )}
    {variant === "trademark" && <sup>TM</sup>}
    {showInc && ", Inc."}
    {variant === "withS" && "'s "}
  </span>
);

export default CompanyName;
