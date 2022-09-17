import { useQuery } from 'react-query';

import { getInventory } from '@/services/inventory';

const QUERY_KEYS = {
  INVENTORY: 'inventory',
  INVENTORY_CONFIGURATION: 'inventory-configuration',
};

export const useInventory = (id: string) =>
  useQuery([QUERY_KEYS.INVENTORY, id], () => getInventory(id), {
    enabled: Boolean(id),
  });
