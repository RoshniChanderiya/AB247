import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';

import { MAX_MILAGE, MIN_MILAGE } from '@/constants';
import { ColorFilter } from '@/types/generic';
import { VehicleConfig, VehiclePayload } from '@/types/vehicle';

interface FilterOptions {
  drivetrainCheckedIndex?: number;
  fuelTypeCheckedIndex?: number;
  engineCheckedIndex?: number;
}

type FromVinString =
  | 'engine_from_vin'
  | 'drivetrain_from_vin'
  | 'fuel_type_from_vin'
  | 'transmission_from_vin'
  | 'wheelbase_from_vin';

/**
 *
 * @param {*} vehicle
 * @param {*} selectedInteriors
 * @param {*} selectedExterior
 * @returns
 */
export const vehicleColorFilter = (
  vehicle: VehiclePayload,
  selectedInteriors: ColorFilter[],
  selectedExterior: ColorFilter[],
) => {
  const exteriorColor = vehicle[`exterior_color_category`];
  const interiorColor = vehicle[`interior_color_category`];

  if (selectedInteriors.length && selectedExterior.length) {
    return (
      Boolean(selectedInteriors.find(({ text }) => text === interiorColor)) &&
      Boolean(selectedExterior.find(({ text }) => text === exteriorColor))
    );
  }

  if (selectedInteriors.length) {
    return Boolean(selectedInteriors.find(({ text }) => text === interiorColor));
  }

  if (selectedExterior.length) {
    return Boolean(selectedExterior.find(({ text }) => text === exteriorColor));
  }

  return true;
};
/**
 *
 * @param {*} colors
 * @param {*} type
 * @param {*} vehicles
 * @param {*} forceReset
 * @returns
 */
export const getAvailableColors = (
  colors: ColorFilter[],
  type: 'exterior' | 'interior',
  vehicles: VehiclePayload[],
  forceReset = false,
) =>
  colors
    .map((cat) => {
      const count = vehicles.filter(
        (vehicle) => vehicle[`${type}_color_category`] === cat.text,
      ).length;
      return {
        text: cat.text,
        count,
        checked: forceReset ? false : cat.checked ?? false,
      };
    })
    .filter((cat) => cat.count > 0);
/**
 *
 * @param {*} vehicleConfiguration
 * @param {*} vehicles
 * @param {*} forceReset
 * @returns
 */
export const getInteriorExterior = (
  vehicleConfiguration: VehicleConfig,
  vehicles: VehiclePayload[],
  forceReset: boolean,
) => {
  const exteriorColorCategory = get(
    vehicleConfiguration,
    '_source.payload.keys.exterior_color_category',
    [],
  );
  const interiorColorCategory = get(
    vehicleConfiguration,
    '_source.payload.keys.interior_color_category',
    [],
  );

  const interior = getAvailableColors(
    interiorColorCategory,
    'interior',
    vehicles,
    forceReset,
  );
  const exterior = getAvailableColors(
    exteriorColorCategory,
    'exterior',
    vehicles,
    forceReset,
  );
  return {
    interior: uniqBy(interior, 'text'),
    exterior: uniqBy(exterior, 'text'),
  };
};
/**
 *
 * @param {*} param0
 * @returns
 */
export const getFilteredVehicles = ({
  interior,
  exterior,
  miles,
  vehicles,
  engines,
  drivetrain,
  fuelType,
}: {
  interior: ColorFilter[];
  exterior: ColorFilter[];
  miles: number[];
  vehicles: VehiclePayload[];
  engines: ColorFilter[];
  drivetrain: ColorFilter[];
  fuelType: ColorFilter[];
}) => {
  const vehicleList = vehicles.filter((vehicle) =>
    vehicleColorFilter(
      vehicle,
      interior.filter(({ checked }) => checked),
      exterior.filter(({ checked }) => checked),
    ),
  );

  const filteredData = vehicleList.filter((vehicle) => {
    let isInMileRange = vehicle.mileage >= miles[0];
    if (miles[1] !== MAX_MILAGE) {
      isInMileRange = vehicle.mileage >= miles[0] && vehicle.mileage <= miles[1];
    }

    let hasEngine = true;
    let hasDriveTrain = true;
    let hasFuelType = true;

    if (engines && Array.isArray(engines) && engines.length > 0) {
      const selectedEngines = engines.filter(({ checked }) => checked);
      if (selectedEngines.length) {
        hasEngine = selectedEngines.some(({ text }) => text === vehicle.engine_from_vin);
      }
    }
    if (drivetrain && Array.isArray(drivetrain) && drivetrain.length > 0) {
      const selectedDrivetrain = drivetrain.filter(({ checked }) => checked);
      if (selectedDrivetrain.length > 0) {
        hasDriveTrain = selectedDrivetrain.some(
          ({ text }) => text === vehicle.drivetrain_from_vin,
        );
      }
    }
    if (fuelType && Array.isArray(fuelType) && fuelType.length > 0) {
      const selectedFuelType = fuelType.filter(({ checked }) => checked);
      if (selectedFuelType.length) {
        hasFuelType = selectedFuelType.some(
          ({ text }) => text === vehicle.fuel_type_from_vin,
        );
      }
    }

    return isInMileRange && hasEngine && hasDriveTrain && hasFuelType;
  });

  return filteredData;
};
/**
 *
 * @param {array<object>} engines
 * @param {array<object>} selectedVehicles
 */
export const getAvailableFilter = (
  data: ColorFilter[],
  selectedVehicles: VehiclePayload[],
  key: FromVinString,
  forceReset = false,
) =>
  data.map((record) => {
    const count = selectedVehicles.filter(
      (vehicle) => vehicle[key] === record.text,
    ).length;
    return {
      text: record.text,
      count,
      checked: forceReset ? false : record.checked ?? false,
    };
  });
/**
 *
 * @param {*} vehicleConfiguration
 * @param {*} vehicles
 * @param {*} options
 * @returns
 */
export const rebuildFilters = (
  vehicleConfiguration: VehicleConfig,
  vehicles: VehiclePayload[],
  options: FilterOptions = {
    drivetrainCheckedIndex: 0,
    fuelTypeCheckedIndex: 0,
  },
) => {
  const enginesFromDatabase = getAvailableFilter(
    get(vehicleConfiguration, '_source.payload.keys.engine_from_vin', []),
    vehicles,
    'engine_from_vin',
  );

  const counts = enginesFromDatabase.map(({ count }) => count);
  const max = Math.max(...counts);
  const maxIndex = counts.indexOf(max);
  const enginesToSet = enginesFromDatabase;

  if (maxIndex > -1) {
    enginesFromDatabase[options.engineCheckedIndex ?? maxIndex].checked = true;
  }

  const mileage = [MIN_MILAGE, MAX_MILAGE];

  const filteredByEnginesVehicles = getFilteredVehicles({
    vehicles,
    interior: [],
    exterior: [],
    miles: mileage,
    engines: enginesToSet,
    drivetrain: [],
    fuelType: [],
  });
  const drivetrainFromDatabase = getAvailableFilter(
    get(vehicleConfiguration, '_source.payload.keys.drivetrain_from_vin', []),
    filteredByEnginesVehicles,
    'drivetrain_from_vin',
  );
  const drivetrainToSet = drivetrainFromDatabase.map((drivetrain, index) => ({
    ...drivetrain,
    checked: index === options.drivetrainCheckedIndex,
  }));

  const filteredByDriveTrainsVehicles = getFilteredVehicles({
    vehicles,
    interior: [],
    exterior: [],
    miles: mileage,
    engines: enginesToSet,
    drivetrain: drivetrainToSet,
    fuelType: [],
  });

  const fuelTypeFromDatabase = getAvailableFilter(
    get(vehicleConfiguration, '_source.payload.keys.fuel_type_from_vin', []),
    filteredByDriveTrainsVehicles,
    'fuel_type_from_vin',
  );
  const fuelTypeDataToSet = fuelTypeFromDatabase.map((fuelTypeItem, index) => ({
    ...fuelTypeItem,
    checked: index === options.fuelTypeCheckedIndex,
  }));

  const filteredByFuelVehicles = getFilteredVehicles({
    vehicles,
    interior: [],
    exterior: [],
    miles: mileage,
    engines: enginesToSet,
    drivetrain: drivetrainToSet,
    fuelType: fuelTypeDataToSet,
  });

  const { interior, exterior } = getInteriorExterior(
    vehicleConfiguration,
    filteredByFuelVehicles,
    false,
  );

  const actualVehicleList = getFilteredVehicles({
    vehicles,
    interior: interior.filter(({ checked }) => checked),
    exterior: exterior.filter(({ checked }) => checked),
    miles: mileage,
    engines: enginesToSet,
    drivetrain: drivetrainToSet,
    fuelType: fuelTypeDataToSet,
  });

  return {
    engines: enginesToSet,
    drivetrain: drivetrainToSet,
    fuelTypeData: fuelTypeDataToSet,
    mileage,
    interior,
    exterior,
    vehicles: actualVehicleList,
  };
};

/**
 * Get average msrp for given vehicles
 * @param {*} selectedVehicles
 * @returns
 */
export const getAveragePrice = (selectedVehicles: VehiclePayload[]) => {
  if (!selectedVehicles?.length) return 0;

  const initialValue = 0;

  const sumWithInitial = selectedVehicles.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    initialValue,
  );

  return Math.floor(sumWithInitial / selectedVehicles.length);
};
