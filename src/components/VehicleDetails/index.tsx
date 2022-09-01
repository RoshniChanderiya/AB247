import { useVehicle } from "@/hooks/vehicle";
import get from "lodash/get";
import { ReactNode, useMemo } from "react";
import VehicleModel from "@/components/VehicleModal";
import dayjs from "dayjs";

interface VehicleDetailsProps {
  id: string;
  dataKey:
    | "color"
    | "year"
    | "make"
    | "model"
    | "miles"
    | "vin"
    | "style"
    | "age"
    | "price";
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ id, dataKey }) => {
  const { data: vehicle } = useVehicle(id);

  const vehicleFields: Record<
    VehicleDetailsProps["dataKey"],
    string | ReactNode
  > = useMemo(() => {
    const dayDiff = dayjs().diff(
      dayjs(get(vehicle, "_source.payload.listing_first_date")),
      "days"
    );
    return {
      color: get(vehicle, "_source.payload.exterior_color_category", "-"),
      year: get(vehicle, "_source.payload.model_year", "-"),
      make: get(vehicle, "_source.payload.make", "-"),
      model: <VehicleModel id={id} />,
      miles: get(vehicle, "_source.payload.mileage", "-"),
      vin: get(vehicle, "_source.payload.vin", "-"),
      style: get(vehicle, "_source.payload.style", "-"),
      age: dayDiff === 1 ? `${dayDiff} Day` : `${dayDiff} Days`,
      price: get(vehicle, "_source.payload.price", "-"),
    };
  }, [vehicle, id]);

  return <>{vehicleFields[dataKey]}</>;
};

export default VehicleDetails;
