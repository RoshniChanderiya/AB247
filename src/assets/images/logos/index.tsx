import { useMemo } from "react";
import FooterLogo from "./FooterLogo.png";
import OnBoardingLogo from "./dealer-onboarding.png";
import HeaderLogo from "./NavbarLogo.png";

interface LogoProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  variant: "on-boarding" | "footer" | "header";
}

const Logo: React.FC<LogoProps> = ({ variant, alt, ...props }) => {
  const src = useMemo(() => {
    switch (variant) {
      case "on-boarding":
        return OnBoardingLogo;

      case "footer":
        return FooterLogo;

      case "header":
        return HeaderLogo;

      default:
        break;
    }
  }, [variant]);
  return <img src={src} alt={alt} {...props} />;
};

export default Logo;
