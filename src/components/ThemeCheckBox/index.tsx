interface ThemeCheckBoxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  id?: string;
  color?: string;
  label: string;
  className?: string;
}

const ThemeCheckBox: React.FC<ThemeCheckBoxProps> = ({
  checked,
  onChange,
  name,
  id,
  color,
  label,
  className,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        id={id}
        color={color}
      />
      <label htmlFor={id} className={className} >
        {label}
      </label>
    </div>
  );
};

export default ThemeCheckBox;
