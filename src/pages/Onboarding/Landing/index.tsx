import BannerSection from "./BannerSection";
import WelcomeToyota from "./WelcomeToyota";
import NotifyProcess from "./NotifyProcess";
import BuyVehicleProcess from "./BuyVehicleProcess";
import PrivateVehicle from "./PrivateVehicle";
import FindVehicleProcess from "./FindVehicleProcess";
import SellingInventory from "./SellingInventory";
import WholesaleSolution from "./WholesaleSolution";
import styles from "./styles.module.scss";

const Landing = () => {
  return (
    <div className={styles.mainContainer}>
      <BannerSection />
      <WelcomeToyota />
      <SellingInventory />
      <NotifyProcess />
      <PrivateVehicle />
      <BuyVehicleProcess />
      <WholesaleSolution />
      <FindVehicleProcess />
    </div>
  );
};
export default Landing;
