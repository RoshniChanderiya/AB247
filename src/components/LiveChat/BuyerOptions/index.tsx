import { Button } from '@autobid247/theme';
import React from 'react';

import styles from './styles.module.scss';

interface BuyerOptionsProps {
  buttonDisabled: boolean;
  isSeller?: boolean;
}
const BuySaleOptions: React.FC<BuyerOptionsProps> = ({ buttonDisabled, isSeller }) => {
  return (
    <div className={styles.buyerOptionsContainer}>
      <Button className={styles.declineButton}>NO SALE</Button>
      <Button
        className={styles.buyButton}
        fillColor="green"
        filled
        disabled={buttonDisabled}
      >
        {isSeller ? 'Sell' : 'BUY'}
      </Button>
    </div>
  );
};

export default BuySaleOptions;
