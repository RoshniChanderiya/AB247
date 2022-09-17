import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';

import { MAX_MILAGE, MIN_MILAGE } from '@/constants';
import { InventoryContext } from '@/providers/InventoryProvider';

import styles from './styles.module.scss';

const STEP = 5000;

interface RangeSliderProps {
  variant: 'primary' | 'secondary';
}

const RangeSlider: React.FC<RangeSliderProps> = ({ variant }) => {
  const { onMilesFilter } = useContext(InventoryContext);

  const [values, setValues] = useState([MIN_MILAGE, MAX_MILAGE]);
  return (
    <div className={classNames(styles.container, styles[variant])}>
      Milage:
      <div className={styles.rangeContainer}>
        <Range
          values={values}
          step={STEP}
          min={MIN_MILAGE}
          max={MAX_MILAGE}
          onChange={(values) => {
            setValues(values);
            onMilesFilter?.(values);
          }}
          renderTrack={({ props, children }) => (
            <div className={styles.sliderContainer}>
              <div
                ref={props.ref}
                className={styles.renderTrack}
                style={{
                  background: getTrackBackground({
                    values,
                    colors: ['#B2EEEE', '#17C0CC', '#B2EEEE'], // TODO: find a way to share variables between scss and js.
                    min: MIN_MILAGE,
                    max: MAX_MILAGE,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div {...props} className={styles.renderThumbContainer}>
              <div className={styles.renderThumbLabel}>{values[index].toFixed(0)}</div>
            </div>
          )}
        />
        <div className={classNames(styles.rangeInfo, styles[variant])}>
          <span>{MIN_MILAGE}</span>
          <span>{MAX_MILAGE}+</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
