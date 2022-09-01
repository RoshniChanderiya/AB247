import classNames from "classnames";
import omit from "lodash/omit";
import styles from "./styles.module.scss";

interface RadioProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  checked?: boolean;
  label: string;
  id?: string;
  labelProps?: React.HTMLAttributes<HTMLLabelElement>;
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  checked,
  label,
  labelProps = {},
  ...props
}) => {
  return (
    <div className={classNames("d-flex gap-2", styles.readioInputContainer)}>
      <input
        id={id}
        name={name}
        checked={checked}
        type="radio"
        className={classNames(styles.radioInput, "my-auto", props.className)}
        {...omit(props, "className")}
      />
      <label htmlFor={id} className="my-auto cursor-pointer" {...labelProps}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
