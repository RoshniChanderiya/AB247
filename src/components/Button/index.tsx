import classNames from "classnames";
import React from "react";
import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
  Spinner,
  SpinnerProps,
} from "reactstrap";
import Space from "../Space";
import styles from "./styles.module.scss";

export interface ButtonProps extends NativeButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
  loaderSize?: SpinnerProps["size"];
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  icon,
  size = "lg",
  children,
  className,
  disabled,
  outline,
  color = "primary",
  active,
  loaderSize,
  ...props
}) => {
  const ContainerComponent = isLoading || icon ? Space : React.Fragment;
  const containerProps =
    isLoading || icon ? { align: "center", justify: "center" } : {};
  return (
    <NativeButton
      className={classNames(
        className,
        styles[`btn-${size}`],
        { [styles.outline]: outline, [styles.active]: active },
        styles.button
      )}
      disabled={disabled || isLoading}
      color={color}
      {...props}
    >
      <ContainerComponent {...containerProps}>
        {isLoading ? <Spinner size={loaderSize || size || "sm"} /> : icon}
        {children}
      </ContainerComponent>
    </NativeButton>
  );
};

export default Button;
