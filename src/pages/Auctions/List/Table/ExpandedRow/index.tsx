import Button from "@/components/Button";
import BuyerProfile from "@/components/BuyerProfile";
import { AUCTION_STATES } from "@/constants";
import { useDeal } from "@/hooks/deals";
import { Auction, AuctionState } from "@/types/auction";
import { Product } from "@/types/product";
import first from "lodash/first";
import get from "lodash/get";
import { useMemo, useState } from "react";
import { Col, Row } from "reactstrap";
import RemoveVehicleModal from "../../RemoveVehicleModal";
import AuctionSchedule from "./AuctionSchedule";
import BackendProfit from "./BackendProfit";
import DropBid from "./DropBid";
import styles from "./styles.module.scss";

interface ExpandedRowProps {
  state?: AuctionState;
  auction: Auction;
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({ auction, state }) => {
  const jacketId = get(auction, "payload.jacket.id", "");
  const { data: jacketData } = useDeal(jacketId);
  const jacketPayload = get(jacketData, "_source.payload");

  const [deleteModalConfirmation, setDeleteModalConfirmation] = useState(false);

  const financial_products = get(jacketPayload, "financial_products", []);
  const financialProductsValue = useMemo(() => {
    return financial_products.reduce(function (a: Product, b: Product) {
      return a + get(b, "display.dlpProfit");
    }, 0);
  }, [financial_products]);

  const auctionStartTime = get(auction, "payload.auction_start_time", "");
  const auctionStatus = get(auction, "payload.auction_status", "");
  const fico = get(jacketData, "_source.payload.pre_qualify_details.score", "");
  const downPayment = get(
    jacketData,
    "_source.payload.payment_summary.down_payment",
    ""
  );
  const term = get(
    jacketData,
    "_source.payload.payment_summary.loan_terms",
    ""
  );

  const vehicles = get(auction, "payload.vehicles", []);
  const vehicleId = get(first(vehicles), "id", "");

  const toggle = () => {
    setDeleteModalConfirmation((prev) => !prev);
  };
  const tradeIn = get(jacketPayload, "trade_in.id", "");
  const paymentMethod = get(jacketPayload, "personal_details.payment_method");
  const isCash = paymentMethod === "cash";

  return (
    <div className={styles.expandedRow}>
      <Row>
        <Col xl={3}>
          <AuctionSchedule
            startTime={auctionStartTime}
            isLive={auctionStatus === "live"}
            isWaiting={state === AUCTION_STATES.expiring}
            timer={auction.payload.timer}
            expirationTime={get(auction, "payload.selection_expiration")}
          />
        </Col>
        <Col xl={3}>
          <BackendProfit auction={auction} />
        </Col>
        <Col xl={3}>
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
        </Col>
        <Col xl={3}>
          {auctionStatus === "scheduled" && (
            <div className="mt-5 pt-4">
              <Button color="secondary" onClick={toggle} block>
                REMOVE VEHICLE
              </Button>
            </div>
          )}
          {[AUCTION_STATES.live, AUCTION_STATES.expiring].includes(
            state as string
          ) && (
            <DropBid
              isWaiting={state === AUCTION_STATES.expiring}
              auction={auction}
            />
          )}
        </Col>
      </Row>

      <RemoveVehicleModal
        open={deleteModalConfirmation}
        onClose={toggle}
        auctionId={auction.id}
        vehicleId={vehicleId}
      />
    </div>
  );
};

export default ExpandedRow;
