import classNames from "classnames";
import {
  Link as NativeLink,
  LinkProps as NativeLinkProps,
} from "react-router-dom";
import styles from "./styles.module.scss";

interface LinkProps
  extends NativeLinkProps,
    React.RefAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "tertiary";
}

const Link: React.FC<LinkProps> = ({
  children,
  variant = "default",
  className,
  to,
  ...props
}) => {
  return (
    <NativeLink
      to={to}
      className={classNames(className, styles.link, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertiary]: variant === "tertiary",
        [styles.default]: variant === "default",
      })}
      {...props}
    >
      {children}
    </NativeLink>
  );
};

export default Link;
