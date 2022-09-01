import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

interface AgeCircleProps {
  days: number;
}

const AgeCircle: React.FC<AgeCircleProps> = ({ days }) => {
  return (
    <div
      className={classNames(
        styles.circle,
        "rounded-circle border border-white",
        {
          "bg-success": days < 31,
          "bg-warning": days > 30 && days < 61,
          "bg-danger": days > 60,
        }
      )}
    />
  );
};

export default AgeCircle;
