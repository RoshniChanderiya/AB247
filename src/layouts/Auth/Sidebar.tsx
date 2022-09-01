import Logo from "@/assets/images/logos";
import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

const Sidebar: React.FC = () => {
  return (
    <div className={classNames(styles.sidebar, "d-none d-lg-block")}>
      <Logo variant="on-boarding" alt="on boarding" className={styles.logo} />
    </div>
  );
};

export default Sidebar;
