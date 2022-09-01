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
        <li>Dashboard</li>
        <li className="my-2">My Profile</li>
        <li>Manage Account</li>
        <li className="my-2">Settings & Privacy</li>
        <li onClick={onLogOut}>Sign out</li>
      </ul>
    </PopoverBody>
  );
};

export default ProfileOptions;
