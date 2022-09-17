import { Button, Form, Input, Space, useWindowDimentions } from '@autobid247/theme';
import classNames from 'classnames';
import React from 'react';

import { formatNumber } from '@/utils/generic';

import styles from './styles.module.scss';

interface PriceAndOfferProps {
  offerAmount: number;
  onOffer: (amount: number) => void;
  buyDisabled?: boolean;
  isSeller?: boolean;
}
const PriceAndOffer: React.FC<PriceAndOfferProps> = ({
  offerAmount,
  onOffer,
  buyDisabled,
  isSeller,
}) => {
  const { isMobile } = useWindowDimentions();

  return (
    <Form
      initialValues={{
        amount: offerAmount,
      }}
      onSubmit={({ amount }: { amount: number }) => onOffer(amount)}
      enableReinitialize
    >
      <div
        className={classNames(styles.offerContainer, {
          [styles.offerContainerDesktop]: !isMobile,
        })}
      >
        <div className={styles.information}>
          <p className={styles.heading}>The current price is</p>
          <span className={styles.amount}>
            {formatNumber(offerAmount, {
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
        <Space
          justify="space-between"
          className={classNames(styles.offer, {
            [styles.offerDesktop]: !isMobile,
          })}
        >
          <Button type="submit" className={styles.offerButton}>
            Offer
          </Button>

          <Input
            label=""
            name="amount"
            type="currency"
            groupProps={{ className: styles.input }}
          />
          <Button
            type="button"
            className={styles.buyButton}
            filled
            fillColor="green"
            disabled={buyDisabled}
          >
            {isSeller ? 'Sell' : 'Buy'}
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default PriceAndOffer;
