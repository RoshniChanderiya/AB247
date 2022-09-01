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
import cardImage from "./cardImage.jpg";
import mapFlorida from "./mapFlorida.jpg";
import HeroImage from "./HeroImage.webp";
import PrivateVehicleCard from "./PrivateVehicleCard.webp";
import WholeSolutionImage from "./WholeSolutionImage.webp";
import IconBid  from "./icons/icon-bid.svg";
import  IconSignup from "./icons/icon-sign up.svg";
import IconNotify  from "./icons/icon-we notify you.svg";
import IconAwesomeCar from "./IconAwesomeCar.png";
import PrivateVehicleMainImage from "./PrivateVehicleMainImage.webp";
import PrivateVehicleCars from "./PrivateVehicleCars.webp";
import WholeSolutions from "./WholeSolutions.webp";
import SellInventory from "./SellInventory.webp";

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
  cardImage,
  mapFlorida,
  HeroImage,
  PrivateVehicleCard,
  WholeSolutionImage,
  IconBid,
  IconNotify,
  IconSignup,
  IconAwesomeCar,
  PrivateVehicleMainImage,
  PrivateVehicleCars, 
  WholeSolutions,
  SellInventory,
};

export default Icon;
