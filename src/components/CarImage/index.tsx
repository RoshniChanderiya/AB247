import classNames from 'classnames';
import first from 'lodash/first';
import React, { useRef } from 'react';
import { useInViewport } from 'react-in-viewport';

import { useImage } from '@/hooks/image';
import { useVehicleImage } from '@/hooks/vehicle';

interface CarImageProps {
  size?: 'small' | 'medium' | 'large';
  vin: string;
  className?: string;
}

const CarImage: React.FC<CarImageProps> = ({ size = 'small', vin, className }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { inViewport: isImageVisibile } = useInViewport(imageRef);
  const {
    data = {
      image_urls: [],
    },
  } = useVehicleImage(vin, isImageVisibile);

  const imageUrl = useImage(`${first(data)}?size=${size}`);

  return (
    <img
      src={imageUrl}
      className={classNames(className, 'img-fluid')}
      alt="car"
      ref={imageRef}
    />
  );
};

export default CarImage;
