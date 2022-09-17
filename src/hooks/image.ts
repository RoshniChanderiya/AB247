import { useEffect, useState } from 'react';

import { VehicleNotFound } from '@/assets/images';
import { preloadImage } from '@/utils/image';

export const useImage = (url: string, defaultImage: string = VehicleNotFound) => {
  const [imageUrl, setImageUrl] = useState(defaultImage);

  useEffect(() => {
    if (url !== 'undefined?size=medium') {
      preloadImage(url, (e: unknown) => {
        if (!e) {
          setImageUrl(url);
        }
      });
    }
  }, [url]);

  return imageUrl;
};
