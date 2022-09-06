import { IconPlay } from "@/assets/images";
import classNames from "classnames";
import React from "react";
import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import styles from "./styles.module.scss";

export type ItemProperties =
  | "BUSINESS_DETAILS"
  | "DEALER_BILLING_COSTS"
  | "DEALER_REPRESENTATIVES"
  | "DEALER_SUMMARY";

interface Item extends Omit<SidebarItemProps, "onClick"> {
  property: ItemProperties;
  path: string;
  requires?: ItemProperties[];
  onClick?: () => void;
  visible?: boolean;
}
export interface SidebarProps {
  title: string;
  items: Item[];
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
          styles.sidebarHeader,
          "py-3",
          "px-2",
          "d-flex",
          "align-items-center",
          "justify-content-between"
        )}
      >
        <h4 className="text-white ms-4 ms-md-5 ms-lg-0 my-3 ps-3">{title}</h4>
      </div>
      <ul className={styles.listGroup}>
        {items.map(
          ({ enabled, active, completed, title, subtitle, onClick }) => (
            <SidebarItem
              key={title}
              title={title}
              subtitle={subtitle}
              enabled={enabled}
              active={active}
              completed={completed}
              onClick={onClick ? onClick : () => {}}
            />
          )
        )}
      </ul>
      {activeStep !== "DEALER_REPRESENTATIVES" &&
        videos.map((video) => (
          <li className={styles.videoContainer} key={video.title}>
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
