import styles from "./styles.module.scss";

interface FieldValueProps {
  label: string;
  value: string;
}

const FieldValue: React.FC<FieldValueProps> = ({ label, value }) => {
  return (
    <span>
      <span className={styles.key}>{label}: </span>
      <span className={styles.value}>{value}</span>
    </span>
  );
};

export default FieldValue;
