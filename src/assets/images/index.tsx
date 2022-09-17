import React from 'react';

import VehicleNotFound from './vehicle-not-available.webp';

interface IconProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  icon: string;
}

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  return <img src={icon} alt={props.alt || ''} {...props} />;
};

export default Icon;

export { VehicleNotFound };
