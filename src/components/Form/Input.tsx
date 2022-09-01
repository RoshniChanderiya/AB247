import { Field, FieldAttributes } from "formik";
import omit from "lodash/omit";
import React from "react";
import Radio from "../Radio";
import ThemeInput from "../ThemeInput";
import styles from "./styles.module.scss";

interface InputProps extends FieldAttributes<any> {
  label: string;
  name: string;
  placeholder?: string;
}

const InputField: React.FC<any> = ({
  type,
  name,
  value,
  field,
  form,
  placeholder,
  onChange,
  ...rest
}) => {
  const error = form.errors[name];
  const touched = form.touched[name];
  if (type === "radio")
    return (
      <Radio
        label="label"
        name="name"
        checked={field.value === value}
        value={value}
        onChange={(e) => form.setFieldValue(name, e.target.value, true)}
        labelProps={{
          className: styles.radio,
        }}
        {...omit(field, ["value", "onChange"])}
        {...rest}
        key={rest.id || name}
      />
    );
  const fieldsToOmit = ["value", "onChange"];

  return (
    <ThemeInput
      type={type}
      error={touched ? error : ""}
      placeholder={placeholder}
      value={field.value || ""}
      onChange={(e: any) => {
        e.persist?.();
        if (onChange) {
          onChange(e);
        }
        if (type === "select") {
          form.setFieldValue(name, e.target.value, true);
        } else {
          field.onChange(e);
        }
      }}
      {...omit(field, fieldsToOmit)}
      {...rest}
      key={rest.id || name}
    />
  );
};

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  ...props
}) => {
  return (
    <Field
      id={name}
      name={name}
      component={({ field, form, ...rest }: any) => (
        <InputField
          type={type}
          name={name}
          field={field}
          form={form}
          value={props.value}
          {...rest}
        />
      )}
      {...props}
    />
  );
};

export default Input;
