import { BidIcon, NotifyIcon, SignupIcon } from "@/assets/images";
import VehicleProcess, {
  VehicleProcessDataProps
} from "@/components/VehicleProcess";
import styles from "./styles.module.scss";


const processData: VehicleProcessDataProps[] = [
  {
    id: "1",
    title: "Sign Up",
    icon: SignupIcon,
    description: [
      "Quick and Easy 2 Minute Process",
      "Mobile or Desktop Access",
      "Secure Data Encryption",
    ],
  },
  {
    id: "2",
    title: "Tell Us What You Buy",
    icon: NotifyIcon,
    description: [
      "Set Your Preferences",
      "Review Available Auction Inventory",
      "Add Inventory to Watch List",
    ],
  },
  {
    id: "3",
    title: "Bid and Buy",
    icon: BidIcon,
    description: [
      "Receive Your Auction Alerts",
      "Enter The Live Online Auction",
      "Bid and Buy...",
    ],
  },
];

const BuyVehicleProcess = () => {
  return (
    <div className={styles.homeContainer}>
      <VehicleProcess processData={processData} />
    </div>
  );
};
export default BuyVehicleProcess;
