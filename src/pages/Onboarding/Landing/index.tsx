import React from "react";
import BannerSection from "./BannerSection";
import HowItFirst from "./HowItFirst";
import HowItSecond from "./HowItSecond";
import HowItThird from "./HowItThird";
import PrivateVehicle from "./PrivateVehicle";
import SellingInventory from "./SellingInventory";
import WelcomeToyota from "./WelcomeToyota";
import WholesaleSolution from "./WholesaleSolution";
import styles from "./styles.module.scss";

const Landing = () => {
  return (
    <div className={styles.mainContainer}>
      <BannerSection />
      <WelcomeToyota />
      <SellingInventory />
      <HowItFirst />
      <PrivateVehicle />
      <HowItSecond />
      <WholesaleSolution />
      <HowItThird />
    </div>
  );
};
export default Landing;
