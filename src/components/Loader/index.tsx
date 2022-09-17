import { Loader as NativeLoader } from '@autobid247/theme';
import React from 'react';

import styles from './styles.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <NativeLoader />
    </div>
  );
};

export default Loader;
