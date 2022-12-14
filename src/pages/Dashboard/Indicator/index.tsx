import { useHeaderCount } from "@/hooks/analytics";
import useAuth from "@/hooks/useAuth";
import classNames from "classnames";
import React from "react";
import styles from "./../styles.module.scss";

const NewDealIndicator: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { data = { deals: { new: 0 } } } = useHeaderCount({
    enabled: isLoggedIn,
  });
  const dealCount = data.deals.new || 0;
  return (
    <div
      className={classNames(styles.indicatorContainer, {
        [styles.noDeal]: dealCount === 0,
      })}>
      <div className={styles.heading}>{dealCount}</div>
      <div className={styles.subHeader}>NEW DEALS!</div>
      {dealCount > 0 && <p className={styles.content}>Congratulations!</p>}
    </div>
  );
};

export default NewDealIndicator;
