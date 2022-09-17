import get from 'lodash/get';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import WholeSaleInfo from '@/components/WholeSaleInfo';
import YMMSSSelection from '@/components/YmmSelection';
import { useCreateVehicleConfiguration, useVehicleConfiguration } from '@/hooks/vehicle';
import InventoryProvider from '@/providers/InventoryProvider';
import { CreateConfigurationPayload } from '@/types/vehicle';
import { retrieveErrorMessage } from '@/utils/RestClient';
import Message from '@/utils/Toast';

import styles from './styles.module.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { vehicleConfigId = '' } = useParams();
  const { data: vehicleConfigData } = useVehicleConfiguration(vehicleConfigId);

  const { isLoading: isCreating, mutateAsync: createInventoryMutation } =
    useCreateVehicleConfiguration();

  const createInventory = async (data: CreateConfigurationPayload) => {
    try {
      const { id } = await createInventoryMutation(data);
      navigate(`inventory/${id}`);
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  const initialValue = get(vehicleConfigData, '_source.payload.search', {});

  const Container = vehicleConfigId ? InventoryProvider : React.Fragment;

  return (
    <Container>
      <div className={styles.ymmsection}>
        <YMMSSSelection
          buttonProps={{
            onClick: createInventory,
            text: 'Search',
            isLoading: isCreating,
            className: styles.updateButton,
          }}
          initialValue={initialValue}
        />
      </div>
      <WholeSaleInfo />
      <Outlet />
    </Container>
  );
};

export default Home;
