import { Col, Container, Loader, Row } from '@autobid247/theme';
import classNames from 'classnames';
import React, { useContext } from 'react';

import RangeSlider from '@/components/RangeSlider';
import useAuth from '@/hooks/useAuth';
import { InventoryContext } from '@/providers/InventoryProvider';
import { VehiclePayload } from '@/types/vehicle';
import { formatNumber } from '@/utils/generic';

import Sidebar from './InventoryList/Sidebar';
import styles from './styles.module.scss';
import VehicleCard from './VehicleCard';

export interface FilterOptions {
  engineCheckedIndex?: number;
  drivetrainCheckedIndex?: number;
  fuelTypeCheckedIndex?: number;
}

const InventorySearch: React.FC = () => {
  const { averageMSRP, isLoading, selectedVehicles } = useContext(InventoryContext);
  const { user } = useAuth();
  const buyerId = user?.dealer?.id;

  return (
    <Container fluid>
      <Row>
        <Col sm={12} className="d-none d-md-block p-0"></Col>
        <Col md={9}>
          <div className="d-none d-md-block">
            <Row>
              <Col sm={6}>
                <RangeSlider variant="primary" />
              </Col>
              <Col sm={6}>
                <div className={styles.avgPriceContainer}>
                  <p className={classNames(styles.averageMSRPLabel, 'mt-auto')}>
                    Avg. Price :
                  </p>
                  <h2 className={styles.avgPrice}>
                    {formatNumber(averageMSRP, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </h2>
                </div>
              </Col>
            </Row>
          </div>
          <Row className={styles.inventoryContainer}>
            {isLoading && <Loader className=" mt-5" />}
            {selectedVehicles?.map((vehicle: VehiclePayload) => (
              <Col sm={6} xl={3} md={3} key={vehicle.vin}>
                <VehicleCard vehicle={vehicle} buyerId={buyerId} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={3} className={styles.sidebar}>
          <Sidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default InventorySearch;
