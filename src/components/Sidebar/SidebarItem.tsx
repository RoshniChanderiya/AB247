import { SidebarArrowIcon } from "@/assets/images";
import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

interface SideItemProps {
  completed: boolean;
  enabled?: boolean;
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}
const SidebarItem: React.FC<SideItemProps> = ({
  completed,
  enabled,
  active,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <li
      onClick={enabled ? onClick : undefined}
      className={classNames(
        styles.listGroupItem,
        "align-items-center",
        "justify-content-between",
        {
          [styles.activePage]: active,
        }
      )}
    >
      <div className="align-self-center">
        <img src={SidebarArrowIcon} alt="arrow" />
      </div>
      <div className="flex-grow-1 px-3 d-flex car-avatar">
        <div
          className={classNames(
            "px-2",
            "d-flex",
            "flex-column",
            "align-self-center",
            { "text-muted": !enabled }
          )}
        >
          <h6>{title}</h6>
          <p className="text-subtitle text-muted text-sm">{subtitle}</p>
        </div>
      </div>
      {completed && (
        <div className="d-flex justify-content-center align-items-center align-self-center">
          <div className={styles.filledCircle} />
        </div>
      )}
      {active && active !== completed && (
        <div className="d-flex justify-content-center align-items-center align-self-center">
          <div className={styles.filledCircle} />
        </div>
      )}
      {!completed && !active && (
        <div className="d-flex justify-content-center align-items-center align-self-center">
          <div className={styles.blankCircle} />
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
