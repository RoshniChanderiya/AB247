import get from 'lodash/get';
import invert from 'lodash/invert';
import React, { createContext } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CAR_TYPE, MAX_MILAGE, MIN_MILAGE } from '@/constants';
import { useVehicleConfiguration } from '@/hooks/vehicle';
import { ColorFilter } from '@/types/generic';
import { FilterSectionString, Vehicle, VehiclePayload } from '@/types/vehicle';
import { VehicleConfigFilter } from '@/types/vehicle';
import { getAveragePrice, getFilteredVehicles, rebuildFilters } from '@/utils/inventory';

const CAR_TYPE_INVERT = invert(CAR_TYPE);

export interface FilterOptions {
  engineCheckedIndex?: number;
  drivetrainCheckedIndex?: number;
  fuelTypeCheckedIndex?: number;
}

interface VehicleConfigProviderProps {
  children: React.ReactNode;
}

export const InventoryContext = createContext<VehicleConfigFilter>({});

const InventoryProvider: React.FC<VehicleConfigProviderProps> = ({ children }) => {
  const { vehicleConfigId = '' } = useParams();

  const [selectedVehicles, setSelectedVehicles] = useState<VehiclePayload[]>([]);
  const [engines, setEngines] = useState<ColorFilter[]>([]);
  const [drivetrain, setDrivetrain] = useState<ColorFilter[]>([]);
  const [fuelType, setFuelType] = useState<ColorFilter[]>([]);

  const [interiorColorCategories, setInteriorColorCategories] = useState<ColorFilter[]>(
    [],
  );
  const [exteriorColorCategories, setExteriorColorCategories] = useState<ColorFilter[]>(
    [],
  );
  const [carType, setCarType] = useState<keyof typeof CAR_TYPE_INVERT>(CAR_TYPE.USED);
  const [miles, setMiles] = useState([MIN_MILAGE, MAX_MILAGE]);

  const { data: vehicleConfigData, isLoading } = useVehicleConfiguration(vehicleConfigId);
  const allVehicles = get(vehicleConfigData, '_source.payload.selected', []);

  useEffect(
    function setValuesFromAPItoLocalState() {
      const carTypeToUse = CAR_TYPE.USED;

      const vehicles = allVehicles.filter(
        ({ stock_type }: { stock_type: string }) =>
          stock_type?.toLowerCase() === carTypeToUse,
      );

      const {
        interior,
        exterior,
        engines: newEngines,
        drivetrain: newDrivetrain,
        fuelTypeData,
        mileage,
        vehicles: actualVehicleList,
      } = rebuildFilters(vehicleConfigData, vehicles);

      setEngines(newEngines);
      setDrivetrain(newDrivetrain);
      setFuelType(fuelTypeData);
      setMiles(mileage);
      setInteriorColorCategories(interior);
      setExteriorColorCategories(exterior);

      // sync local state with API
      setSelectedVehicles(actualVehicleList);
      setCarType(carTypeToUse);
    },
    [vehicleConfigData],
  );

  const usedVehicles = useMemo(() => {
    return allVehicles
      .filter(
        ({ stock_type }: { stock_type: string }) =>
          stock_type?.toLowerCase() === CAR_TYPE.USED,
      )
      .map((vehicle: Vehicle) => ({
        ...vehicle,
        selected: true,
      }));
  }, [allVehicles]);

  /**
   *
   * @param {*} isChecked
   * @param {*} index
   * @param {*} type
   */
  const onColorFilterUpdated = (isChecked: boolean, type: string, index: number) => {
    const categoryToPick: ColorFilter[] = Object.assign(
      [],
      type === 'interior' ? interiorColorCategories : exteriorColorCategories,
    );
    const setterFunction =
      type === 'interior' ? setInteriorColorCategories : setExteriorColorCategories;

    categoryToPick[index].checked = isChecked;
    setterFunction(categoryToPick);
    const selectedInteriors: ColorFilter[] = (
      type === 'interior' ? categoryToPick : interiorColorCategories
    ).filter(({ checked }) => checked);
    const selectedExterior: ColorFilter[] = (
      type === 'interior' ? exteriorColorCategories : categoryToPick
    ).filter(({ checked }) => checked);
    const vehicles = getFilteredVehicles({
      vehicles: usedVehicles,
      interior: selectedInteriors,
      exterior: selectedExterior,
      miles,
      engines,
      drivetrain,
      fuelType,
    });
    setSelectedVehicles(vehicles);
  };

  /**
   *
   * @param {number} newMiles
   */
  const onMilesFilter = (newMiles: number[]) => {
    const vehicles = getFilteredVehicles({
      vehicles: usedVehicles,
      interior: interiorColorCategories,
      exterior: exteriorColorCategories,
      miles: newMiles,
      engines,
      drivetrain,
      fuelType,
    });
    setSelectedVehicles(vehicles);
  };

  /**
   *
   * @param {"engine" | "drivetrain" | "fuelType"} type
   * @param {string} key
   */
  const onFilterUpdate = (type: FilterSectionString, key: string) => {
    const options: FilterOptions = {};
    const engineIndex = engines.findIndex(({ checked }) => checked);
    const drivetrainIndex = drivetrain.findIndex(({ checked }) => checked);
    const fuelTypeIndex = fuelType.findIndex(({ checked }) => checked);
    switch (type) {
      case 'engine': {
        const index = engines.findIndex(({ text: engineKey }) => engineKey === key);
        options.engineCheckedIndex = index;
        options.drivetrainCheckedIndex = drivetrainIndex;
        options.fuelTypeCheckedIndex = fuelTypeIndex;
        break;
      }
      case 'drivetrain': {
        const newDrivetrainIndex = drivetrain.findIndex(
          ({ text: engineKey }) => engineKey === key,
        );
        options.engineCheckedIndex = engineIndex;
        options.drivetrainCheckedIndex = newDrivetrainIndex;
        options.fuelTypeCheckedIndex = fuelTypeIndex;
        break;
      }
      case 'fuelType': {
        const newFuelTypeIndex = fuelType.findIndex(
          ({ text: engineKey }) => engineKey === key,
        );
        options.engineCheckedIndex = engineIndex;
        options.drivetrainCheckedIndex = drivetrainIndex;
        options.fuelTypeCheckedIndex = newFuelTypeIndex;
        break;
      }
      default:
        break;
    }
    const vehicles = usedVehicles.map((vehicle: Vehicle) => ({
      ...vehicle,
      selected: true,
    }));
    const {
      interior,
      exterior,
      engines: newEngine,
      drivetrain: newDrivetrains,
      fuelTypeData,
      mileage,
      vehicles: actualVehicleList,
    } = rebuildFilters(vehicleConfigData, vehicles, options);
    setEngines(newEngine);
    setDrivetrain(newDrivetrains);
    setFuelType(fuelTypeData);
    setMiles(mileage);
    setInteriorColorCategories(interior);
    setExteriorColorCategories(exterior);
    // sync local state with API
    setSelectedVehicles(actualVehicleList);
  };

  const averageMSRP = useMemo(() => getAveragePrice(usedVehicles), [usedVehicles]);
  const searchVehicle = get(vehicleConfigData, '_source.payload.search', {});

  return (
    <InventoryContext.Provider
      value={{
        details: vehicleConfigData,
        allVehicles,
        selectedVehicles,
        carType,
        setCarType,
        onColorFilterUpdated,
        interiorColorCategories,
        exteriorColorCategories,
        miles,
        onMilesFilter,
        engines,
        drivetrain,
        fuelType,
        onFilterUpdate,
        averageMSRP,
        isLoading,
        searchVehicle,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
