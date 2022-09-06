import BannerSection from "./BannerSection";
import WelcomeSection from "./WelcomeSection";
import NotifyProcess from "./NotifyProcess";
import BuyVehicleProcess from "./BuyVehicleProcess";
import PrivateVehicle from "./PrivateVehicle";
import FindVehicleProcess from "./FindVehicleProcess";
import SellingInventory from "./SellingInventory";
import WholesaleSolution from "./WholesaleSolution";
import styles from "./styles.module.scss";

const OnboardingLandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <BannerSection />
      <WelcomeSection />
      <SellingInventory />
      <NotifyProcess />
      <PrivateVehicle />
      <BuyVehicleProcess />
      <WholesaleSolution />
      <FindVehicleProcess />
    </div>
  );
};
export default OnboardingLandingPage;
