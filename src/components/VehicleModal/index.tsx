import { useVehicle } from "@/hooks/vehicle";
import { get } from "lodash";
import React from "react";

interface VehicleModelProps {
  id: string;
}
const VehicleModel: React.FC<VehicleModelProps> = ({ id }) => {
  const { data: vehicle } = useVehicle(id);

  // TODO: show image alongside model name. Need to migrate useImage hook, and CarImage component from ux247
  return <>{get(vehicle, "_source.payload.model")}</>;
};

export default VehicleModel;
