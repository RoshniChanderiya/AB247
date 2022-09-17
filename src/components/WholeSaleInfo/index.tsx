import { Col, Row } from '@autobid247/theme';
import classNames from 'classnames';
import React from 'react';

import useAuth from '@/hooks/useAuth';

import styles from './styles.module.scss';

const WholeSaleInfo = () => {
  const { user } = useAuth();
  return (
    <Row
      className={classNames(
        styles.parent,
        'd-flex align-item-center justify-content-center',
      )}
    >
      <Col md={3} className={(styles.wholeSale, 'mt-2')}>
        <h4 className={(styles.bidWizerWholeSale, 'mx-2')}>BidWizer Wholesale Portal</h4>
      </Col>
      <Col md={5} className={styles.selectVehicle}>
        <p className="mt-2">
          Set your Radius, Select Vehicle and click Search button above to get started.
        </p>
      </Col>
      <Col md={4} className={styles.selectVehicle}>
        <h5 className="mt-2 mx-2">Welcome back {user?.name} of Fleming Island </h5>
      </Col>
    </Row>
  );
};

export default WholeSaleInfo;
