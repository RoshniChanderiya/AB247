import Button from "@/components/Button";
import classNames from "classnames";
import styles from "./styles.module.scss";

const SignupButton = () => {
    return(
         <div className={styles.processBtn}>
        <Button
          filled
          className={classNames("ml-5", "btn-save", "h-100", "mt-5")}
        >
          ONE SIGN UP - GET ALL 3
        </Button>
      </div>
    )
}
export default SignupButton