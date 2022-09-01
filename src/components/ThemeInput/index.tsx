import classNames from "classnames";
import omit from "lodash/omit";
import React from "react";
import {
  FormGroup,
  FormGroupProps,
  Input,
  InputGroup,
  InputProps,
} from "reactstrap";
import CustomSelect from "./CustomSelect";
import styles from "./styles.module.scss";
import NumberFormat from "react-number-format";

export interface ThemeInputProps extends Omit<InputProps, "type"> {
  label: string;
  help?: string;
  error?: string;
  showRequiredMark?: boolean;
  onSearch?: (value?: string) => void;
  groupProps?: FormGroupProps;
  showIcons?: boolean;
  variant?: "primary" | "secondary" | "default";
  block?: boolean;
  type?: InputProps["type"] | "currency";
}

const ThemeInput: React.FC<ThemeInputProps> = ({
  error,
  label,
  help,
  showRequiredMark = false,
  onSearch,
  groupProps = {},
  showIcons = false,
  variant = "secondary",
  name,
  block,
  type,
  ...props
}) => {
  return (
    <>
      <FormGroup className={classNames({ "w-100": block })} {...groupProps}>
        <InputGroup className={styles.group}>
          <label
            className={classNames(styles.inputLabel, {
              [styles.primary]: variant === "primary",
              [styles.secondary]: variant === "secondary",
              [styles.default]: variant === "default",
            })}
            htmlFor={name}
          >
            {label}
            {showRequiredMark && <span className={styles.astric}>*</span>}
          </label>

          <div className="w-100 position-relative">
            {type === "select" && (
              <CustomSelect label={label} name={label} {...props} />
            )}
            {type === "currency" && (
              <NumberFormat
                thousandsGroupStyle="thousand"
                thousandSeparator
                allowNegative={false}
                prefix="$"
                decimalSeparator="."
                className={classNames(
                  `form-control form-control-text shadow-md w-100`,
                  styles.inputField
                )}
                onValueChange={(values, sourceInfo) => {
                  const { value } = values;
                  const { event } = sourceInfo;
                  if (!event?.target) {
                    return;
                  }
                  event.target.value = value;
                  event.persist();
                  if (props.onChange) {
                    props.onChange(event);
                  }
                }}
                {...omit(props, ["className", "onChange"])}
              />
            )}
            {!["select", "currency"].includes(type as string) && (
              <Input
                className={classNames(
                  `form-control-text shadow-md w-100`,
                  styles.inputField
                )}
                name={name}
                invalid={Boolean(error)}
                id={name}
                type={type as InputProps["type"]}
                {...omit(props, "className")}
              />
            )}
          </div>
          {error && (
            <div className={classNames("text-danger", styles.error)}>
              {error}
            </div>
          )}
        </InputGroup>
      </FormGroup>
      {help && <small className={styles.info}>{help}</small>}
    </>
  );
};

export default React.memo(ThemeInput);
