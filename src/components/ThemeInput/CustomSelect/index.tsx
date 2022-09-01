import { ChevronDown } from "@/assets/images";
import classNames from "classnames";
import find from "lodash/find";
import head from "lodash/head";
import { useMemo } from "react";
import Select, {
  components,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  Theme,
} from "react-select";
import styles from "./styles.module.scss";

interface CustomSelectProps {
  label?: string;
  name?: any;
  onChange?: any;
  options?: any;
  defaultValue?: any;
  menuPlacement?: "top" | "bottom" | "auto";
  isDisabled?: boolean;
  placeholder?: any;
  isLoading?: boolean;
  value?: any;
  className?: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown color="#F97171" />
    </components.DropdownIndicator>
  );
};

const style = {
  container: (base: CSSObjectWithLabel) => ({
    ...base,
    width: "100%",
    height: 44,
    paddingRight: 10,
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    margin: 0,
    fontSize: 16,
    zIndex: 1,
  }),
  option: (base: CSSObjectWithLabel, state: { isSelected: boolean }) => {
    return {
      ...base,
      cursor: "pointer",
      color: state.isSelected ? "#ffffff" : "#110f45",
      "&:hover": {
        borderColor: "#ffffff",
        color: "#ffffff",
        backgroundColor: "#035F77",
      },
      backgroundColor: state.isSelected ? "#035F77" : "#ffffff",
    };
  },
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    borderStyle: "none",
    height: 44,
    cursor: "pointer",
    borderRadius: 100,
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  onChange,
  options,
  defaultValue,
  menuPlacement,
  isDisabled,
  placeholder,
  isLoading,
  value,
  className,
}) => {
  const onSelectChange = ({ value }: { label: string; value: string }) =>
    onChange({ target: { value, name } });

  const selectedValue = useMemo(() => {
    let formValue = null;
    if (Array.isArray(value) && head(value)) {
      formValue = find(options, { value: value[0].value });
    } else if (value) {
      formValue = find(options, { value: value });
    }
    return formValue || null;
  }, [value, options]);

  return (
    <div className={classNames(className, styles.select)}>
      <Select
        closeMenuOnScroll={(e: Event) => e.target === document}
        defaultValue={defaultValue}
        menuPlacement={menuPlacement || "auto"}
        className={classNames(styles.formSelect, "react-select--inline")}
        isDisabled={isDisabled}
        options={options}
        onChange={onSelectChange}
        placeholder={placeholder}
        isLoading={isLoading}
        styles={style}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        theme={(theme: Theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "white",
            neutral50: "#110f45",
            neutral80: "#110f45",
          },
          controlWidth: 100,
          controlHeight: 50,
        })}
        value={selectedValue}
      />
    </div>
  );
};

export default CustomSelect;
