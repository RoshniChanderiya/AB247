import { Space } from '@autobid247/theme';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

import { formatNumber } from '@/utils/generic';

import styles from './styles.module.scss';

interface VehicleMetaDetailsProps {
  miles: number;
  price: number;
  listingDate?: string;
  shipping?: number;
}
const VehicleMetaDetails: React.FC<VehicleMetaDetailsProps> = ({
  miles,
  price,
  listingDate,
  shipping = 0,
}) => {
  const age = dayjs().diff(dayjs(listingDate), 'days');
  return (
    <Space justify="space-between" className={styles.metaData}>
      <Space direction="vertical" size={0} className={styles.detail}>
        <label htmlFor="miles" className={styles.value}>
          {miles}
        </label>
        <span className={styles.label}>Miles</span>
      </Space>
      <Space direction="vertical" size={0} className={styles.detail}>
        <label htmlFor="miles" className={styles.value}>
          {formatNumber(price)}
        </label>
        <span className={styles.label}>Black Book Clean</span>
      </Space>
      <Space direction="vertical" size={0} className={styles.detail}>
        <label htmlFor="miles" className={styles.value}>
          {formatNumber(shipping)}
        </label>
        <span className={styles.label}>Shipping Est.</span>
      </Space>
      <Space direction="vertical" size={0} className={styles.detail}>
        <label
          htmlFor="miles"
          className={classNames(styles.value, {
            [styles.danger]: age > 90,
          })}
        >
          {age}
        </label>
        <span className={styles.label}>{age === 1 ? 'Day' : 'Days'} Old</span>
      </Space>
    </Space>
  );
};

export default VehicleMetaDetails;
