import React, { useMemo } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { VehicleNotFound } from '@/assets/images';
import { useVehicleImage } from '@/hooks/vehicle';

import Loader from '../Loader';
import styles from './styles.module.scss';

interface CarImageGalleryProps {
  vin: string;
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ vin }) => {
  const { isLoading, data } = useVehicleImage(vin);

  const images: ReactImageGalleryItem[] = useMemo(() => {
    if (!data) {
      return [
        {
          original: VehicleNotFound,
          thumbnail: VehicleNotFound,
        },
      ];
    }

    return data.map((image: string) => ({
      original: image,
      thumbnail: image,
    }));
  }, [data]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {!isLoading && (
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          showNav={false}
          renderItem={({ original }) => (
            <div className={styles.mainImage}>
              <img className={styles.original} src={original} alt="original" />
            </div>
          )}
          renderThumbInner={({ thumbnail }) => (
            <div className={styles.thumbImage}>
              <img src={thumbnail} alt="thumbnail" className={styles.thumbnail} />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default CarImageGallery;
