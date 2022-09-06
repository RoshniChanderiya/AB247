import { BidIcon, NotifyIcon, SignupIcon } from "@/assets/images";
import VehicleProcess, {
  VehicleProcessDataProps,
} from "@/components/VehicleProcess";

const processData: VehicleProcessDataProps[] = [
  {
    id: "1",
    title: "Sign Up",
    icon: SignupIcon,
    description: [
      "Quick and Easy 2 Minute Process",
      "Mobile and Destop Access",
      "Secure Data Encryption",
    ],
  },
  {
    id: "2",
    title: "We Notify You",
    icon: NotifyIcon,
    description: [
      "When you Inventory is Selected",
      "When a Pre-Qualifiled Buyer Has Selected Your Car",
      "When a Customer Schedules an Auction",
    ],
  },
  {
    id: "3",
    title: "Bid",
    icon: BidIcon,
    description: [
      "View the Customer Profile",
      "See Your Backend Profile",
      "You know the Drill...",
    ],
  },
];

const NotifyProcess = () => {
  return <VehicleProcess processData={processData} />;
};
export default NotifyProcess;
