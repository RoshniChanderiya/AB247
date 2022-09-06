import { NotifyIcon, SellCarIcon, SignupIcon } from "@/assets/images";
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
      "Enter Banking Information",
      "Enter Floorplan Company",
    ],
  },
  {
    id: "2",
    title: "Find a Car From Any Location",
    icon: NotifyIcon,
    description: [
      "Find the Exact Car You Need",
      "Make a Deal Online",
      "Add to Your Floorplan",
    ],
  },
  {
    id: "3",
    title: "Sell More",
    icon: SellCarIcon,
    description: [
      "We Pick Up and Delivery",
      "Meet Your Buyers Needs",
      "Never Loose a Customer Again...",
    ],
  },
];
const FindVehicleProcess = () => {
  return <VehicleProcess processData={processData} />;
};
export default FindVehicleProcess;
