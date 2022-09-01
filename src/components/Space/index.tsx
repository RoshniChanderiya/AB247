import classNames from "classnames";
import React from "react";
import { isFragment } from "react-is";
import styles from "./styles.module.scss";

const toArray = (children: any, option: Record<string, boolean> = {}) => {
  let ret: any[] = [];

  React.Children.forEach(children, (child) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
};

interface SpaceProps {
  size?: "small" | "medium" | "large" | number;
  direction?: "horizontal" | "vertical";
  children?: React.ReactNode;
  className?: string;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
}

const Space: React.FC<SpaceProps> = ({
  size = "small",
  direction = "horizontal",
  children,
  className,
  align,
  justify,
}) => {
  const itemArray = toArray(children, { keepEmpty: true });

  return (
    <div
      className={classNames(styles.spaceContainer, className, {
        [styles[size]]: typeof size === "string",
        [styles.vertical]: direction === "vertical",
      })}
      style={{
        alignItems: align,
        justifyContent: justify,
        gap: typeof size === "number" ? `${size}px` : undefined,
      }}
    >
      {itemArray.map((item, index) => (
        <div className={styles.spaceItem} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Space;
