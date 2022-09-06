import Link from "@/components/Link";
import { AppRoutes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PopoverBody } from "reactstrap";
import styles from "./styles.module.scss";

const ProfileOptions: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onLogOut = () => {
    logout(() => {
      navigate(AppRoutes.LOGIN);
    });
  };
  return (
    <PopoverBody className="p-0">
      <ul className={styles.dropdownItems}>
        <li>
          <Link to="/profile">Manage Account</Link>
        </li>
        <li onClick={onLogOut}>Sign out</li>
      </ul>
    </PopoverBody>
  );
};

export default ProfileOptions;
