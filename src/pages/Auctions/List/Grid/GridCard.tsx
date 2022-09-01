import BackendProfit from "@/components/BackendProfit";
import Button from "@/components/Button";
import BuyerProfile from "@/components/BuyerProfile";
import Timer from "@/components/Timer";
import { DEFAULT_DATE_TIME_FORMAT } from "@/constants";
import { useDeal } from "@/hooks/deals";
import { useVehicle } from "@/hooks/vehicle";
import FloorPrice from "@/pages/Auctions/List/FloorPrice";
import { Auction } from "@/types/auction";
import { Product } from "@/types/product";
import dayjs from "dayjs";
import first from "lodash/first";
import get from "lodash/get";
import { useMemo, useState } from "react";
import RemoveVehicleModal from "../RemoveVehicleModal";
import FieldValue from "./FieldValue";
import styles from "./styles.module.scss";

interface GridCardProps {
  auction: Auction;
}

const GridCard: React.FC<GridCardProps> = ({ auction }) => {
  const [deleteModalConfirmation, setDeleteModalConfirmation] = useState(false);

  const auctionStartTime = get(auction, "payload.auction_start_time", "");
  const jacketId = get(auction, "payload.jacket.id", "");

  const { data: jacketData } = useDeal(jacketId);
  const jacketPayload = get(jacketData, "_source.payload", "-");

  const financialProducts = get(jacketPayload, "financial_products", []);
  const financialProductsValue = useMemo(() => {
    return financialProducts.reduce(function (a: Product, b: Product) {
      return a + get(b, "display.dlpProfit");
    }, 0);
  }, [financialProducts]);

  const fico = get(jacketPayload, "pre_qualify_details.score", "");
  const downPayment = get(jacketPayload, "payment_summary.down_payment", "");
  const term = get(jacketPayload, "payment_summary.loan_terms", "");
  const age = get(auction, "payload.vehicles[0].days_on_market", " - ");

  const vehicles = get(auction, "payload.vehicles", []);
  const vehicleId = get(first(vehicles), "id", "");

  const { data: vehicle } = useVehicle(vehicleId);
  const vehiclePayload = get(vehicle, "_source.payload", "-");

  const color = get(vehiclePayload, "exterior_color_category", "-");
  const year = get(vehiclePayload, "model_year", "-");
  const make = get(vehiclePayload, "make", "-");
  const model = get(vehiclePayload, "model", "-");
  const miles = get(vehiclePayload, "mileage", "-");
  const vin = get(vehiclePayload, "vin", "-");

  const toggle = () => {
    setDeleteModalConfirmation((prev) => !prev);
  };
  const tradeIn = get(jacketPayload, "trade_in.id", "");

  const paymentMethod = get(jacketPayload, "personal_details.payment_method");
  const isCash = paymentMethod === "cash";

  const auctionStatus = auction.payload.auction_status;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6 className={styles.headerTitle}>
          {year} {make} {model}
        </h6>
        <div className={styles.headerData}>
          <FieldValue label="VIN" value={vin} />
          <FieldValue label="Age" value={age} />
          <FieldValue label="Miles" value={miles} />
          <FieldValue label="Color" value={color} />
        </div>
      </div>

      <div className={styles.cardBody}>
        <FloorPrice
          label="Floor Price"
          auction={auction}
          className={styles.gridInput}
        />
        <h5 className={styles.dateAndTime}>
          {auctionStatus === "live" && (
            <Timer timeInSeconds={(auction.payload.timer || 0) / 1000} />
          )}
          {auctionStatus !== "live" &&
            dayjs(auctionStartTime).format(DEFAULT_DATE_TIME_FORMAT)}
        </h5>
        <BuyerProfile
          downPayment={downPayment}
          fico={isCash ? "-" : fico}
          terms={isCash ? 0 : term}
          value={financialProductsValue}
          view="table"
          buyRate={
            isCash
              ? "-"
              : get(jacketPayload, "payment_summary.interest_rate", "...")
          }
          tradeInId={tradeIn}
        />

        <div className="d-flex justify-content-between mt-4">
          <div className="w-50">
            <h5 className={styles.price}>
              <BackendProfit auction={auction} />
            </h5>
            <p className={styles.priceSubText}>BACKEND PROFIT est.</p>
          </div>
          {auctionStatus === "scheduled" && (
            <div className="my-auto w-50">
              <Button onClick={toggle} color="secondary" block>
                REMOVE VEHICLE
              </Button>
            </div>
          )}
        </div>
      </div>

      <RemoveVehicleModal
        open={deleteModalConfirmation}
        onClose={toggle}
        auctionId={auction.id}
        vehicleId={vehicleId}
      />
    </div>
  );
};

export default GridCard;
