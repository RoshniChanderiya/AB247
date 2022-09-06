import classNames from "classnames";
import omit from "lodash/omit";
import React from "react";
import styles from "./styles.module.scss";

interface SwitchProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
}

const Switch: React.FC<SwitchProps> = ({ labelProps, className, ...props }) => {
  return (
    <label
      className={classNames(styles.switch, labelProps?.className)}
      {...omit(labelProps, ["className"])}
    >
      <input
        type="checkbox"
        className={classNames(styles.checkbox, className)}
        {...props}
      />
      <span className={classNames(styles.slider, styles.round)}></span>
    </label>
  );
};

export default Switch;
