import { ChevronUp, ChevronDown } from "@/assets/images";
import styles from "./styles.module.scss";

const ColumnSort: React.FC = () => {
  return (
    <span className={styles.sortingArrow}>
      <ChevronUp className={styles.chevron} />
      <ChevronDown className={styles.chevron} />
    </span>
  );
};

export default ColumnSort;
