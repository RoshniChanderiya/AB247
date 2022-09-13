import { AppRoutes } from "@/constants";
import { useDealer } from "@/hooks/dealer";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BannerSection from "./BannerSection";
import BuyVehicleProcess from "./BuyVehicleProcess";
import FindVehicleProcess from "./FindVehicleProcess";
import NotifyProcess from "./NotifyProcess";
import PrivateVehicle from "./PrivateVehicle";
import SellingInventory from "./SellingInventory";
import styles from "./styles.module.scss";
import WelcomeSection from "./WelcomeSection";
import WholesaleSolution from "./WholesaleSolution";

const OnboardingLandingPage = () => {
  const [params] = useSearchParams();
  const dealerId = params.get("dealer");
  const navigate = useNavigate();

  const { isSuccess, data } = useDealer(dealerId as string);

  useEffect(() => {
    if (!dealerId) {
      navigate(AppRoutes.HOME);
    }
  }, [dealerId, navigate]);

  return (
    <div className={styles.mainContainer}>
      <BannerSection />
      {isSuccess && <WelcomeSection name={data._source.payload.dealer_name} />}
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
