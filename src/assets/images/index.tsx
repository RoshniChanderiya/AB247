import IconEdit from "./icons/editIcon-primary.svg";
import ArrowIcon from "./icons/icon-arrow.svg";
import IconArrowLeft from "./icons/icon-back.png";
import IconPlay from "./icons/icon-play.svg";
import SidebarArrowIcon from "./icons/icon-sidearrow.svg";
import IconMenu from "./icon-menu.svg";
import IconFB from "./IconFB.png";
import IconInstagram from "./IconInstagram.png";
import IconLinkedin from "./IconLinkedin.png";
import IconPinterest from "./IconPinterest.png";
import IconTwitter from "./IconTwitter.png";
import VehicleNotFound from "./VehicleNotFound.webp";
import BannerImage from "./BannerImage.webp";
import BidIcon from "./icons/IconBid.svg";
import MapFlorida from "./mapFlorida.jpg";
import WholeSolutions from "./WholeSolutions.webp";
import WholeSolutionImage from "./WholeSolutionImage.webp";
import SellInventory from "./SellInventory.webp";
import PrivateVehicleCars from "./PrivateVehicleCars.webp";
import PrivateVehicleMainImage from "./PrivateVehicleMainImage.webp";
import SignupIcon from "./icons/IconSignup.svg";
import NotifyIcon from "./icons/IconWeNotify.svg";
import SellCarIcon from "./icons/IconSellcar.svg";

interface IconProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  icon: string;
}

const Icon: React.FC<IconProps> = ({ icon, alt, ...props }) => {
  return <img src={icon} alt={alt} {...props} />;
};

export {
  AlertTriangle,
  ChevronDown,
  ChevronLeft as SliderNext,
  ChevronRight,
  ChevronRight as SliderPreview,
  ChevronUp,
  Edit,
  Grid as GridIcon,
  MapPin,
  Menu,
  MinusCircle,
  PlusCircle,
  RotateCcw as Rotate,
  Search,
  Trash2 as Trash,
  X as Cross,
  XCircle,
} from "react-feather";
export {
  IconArrowLeft,
  ArrowIcon,
  IconFB,
  IconInstagram,
  IconLinkedin,
  IconPinterest,
  IconTwitter,
  IconMenu,
  IconPlay,
  VehicleNotFound,
  SidebarArrowIcon,
  IconEdit,
  BannerImage,
  BidIcon,
  MapFlorida,
  WholeSolutions,
  WholeSolutionImage,
  SellInventory,
  PrivateVehicleCars,
  PrivateVehicleMainImage,
  NotifyIcon,
  SellCarIcon,
  SignupIcon,
};

export default Icon;
