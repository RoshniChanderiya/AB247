import { Button, Card, CardBody, Col, Modal, Row } from '@autobid247/theme';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import CarImage from '@/components/CarImage';
import LiveChat from '@/components/LiveChat';
import { Vehicle } from '@/types/vehicle';
import { formatNumber } from '@/utils/generic';

import styles from './styles.module.scss';

interface VehicleCardProps {
  vehicle: Vehicle['_source']['payload'];
  buyerId: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, buyerId }) => {
  const { mileage, msrp, price, make, model, model_year, vin, listing_first_date } =
    vehicle;

  const [open, setOpen] = useState(false);
  const days = dayjs().diff(dayjs(listing_first_date), 'days');

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Card className={styles.contentArea}>
        <CarImage vin={vin} className={styles.carImage} size="medium" />
        <CardBody>
          <div className="d-flex justify-content-between mb-4">
            <p>
              {model_year} {make} {model}
            </p>
            <p>
              <span className={styles.days}>{days}</span>{' '}
              <span className={styles.old}>Days Old</span>
            </p>
          </div>
          <Row className="d-flex">
            <Col XS={4} className="p-0">
              <p className={styles.numberText}>{formatNumber(msrp)}</p>
              <p className={styles.text}>Price</p>
            </Col>
            <Col XS={4} className="p-0">
              <p className={styles.numberText}>{mileage}</p>
              <p className={styles.text}>Miles</p>
            </Col>
            <Col XS={4} className="p-0">
              <p className={styles.numberText}>{formatNumber(price)}</p>
              <p className={styles.text}>Black Book</p>
            </Col>
          </Row>
          <div className="text-center mt-3">
            <Button
              className={styles.viewMakeBtn}
              onClick={onOpen}
              fillColor="green"
              filled
            >
              View Details or Make Offer
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={open}
        footer={null}
        onCancel={onOpen}
        toggle={onOpen}
        size="lg"
        noHeader
        bodyProps={{ className: styles.chatModal }}
      >
        <LiveChat vin={vin} buyerId={buyerId} />
      </Modal>
    </>
  );
};

export default VehicleCard;
