import styles from "./styles.module.scss";
const ContactNumberFooter = () => {
  return (
    <p className={styles.contactFooter}>
      <span className={styles.footerText}>
        <i>Have Additional Questions? </i>
      </span>
      <em>- Give us a call (800) 920-6912</em>
    </p>
  );
};

export default ContactNumberFooter;
