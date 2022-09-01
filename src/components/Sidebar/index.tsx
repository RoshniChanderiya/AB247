import { IconPlay } from "@/assets/images";
import classNames from "classnames";
import React from "react";
import SidebarItem from "./SidebarItem";
import styles from "./styles.module.scss";

interface ItemData {
  completed: boolean;
  enabled?: boolean;
  active: boolean;
  title: string;
  subtitle: string;
  property: string;
  onClick: () => void;
}
interface SidebarProps {
  title: string;
  items: ItemData[];
  activeStep: string;
}
const Sidebar: React.FC<SidebarProps> = ({ items, title, activeStep }) => {
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
    <div className={styles.sideContainer}>
      <div
        className={classNames(
          "py-3",
          "px-2",
          "d-flex",
          styles.sidebarHeader,
          "align-items-center",
          "justify-content-between"
        )}
      >
        <h4 className="text-white ms-4 ms-md-5 ms-lg-0 my-3 ps-3">{title}</h4>
      </div>
      <ul className={styles.listGroup}>
        {items.map(
          (
            { enabled, active, completed, title, subtitle, onClick },
            index
          ) => (
            <SidebarItem
              title={title}
              subtitle={subtitle}
              key={index}
              enabled={enabled}
              active={active}
              completed={completed}
              onClick={onClick}
            />
          )
        )}
      </ul>
      {activeStep !== "DEALER_REPRESENTATIVES" &&
        videos.map((video) => (
          <li className={styles.videoContainer}>
            <div>
              <img src={IconPlay} className={styles.video} alt="" />
              <h2 className={styles.title}>{video.title}</h2>
            </div>
          </li>
        ))}
    </div>
  );
};

export default Sidebar;
