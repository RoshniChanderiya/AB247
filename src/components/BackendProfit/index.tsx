import { useDeal } from "@/hooks/deals";
import { useVehicle } from "@/hooks/vehicle";
import { Auction } from "@/types/auction";
import { formatNumber } from "@/utils/NumberFomatter";
import get from "lodash/get";
import sum from "lodash/sum";
import React, { useMemo } from "react";

interface BackendProfitProps {
  auction: Auction;
}

const BackendProfit: React.FC<BackendProfitProps> = ({ auction }) => {
  const { isLoading: isLoadingDeal, data: dealDetails } = useDeal(
    auction.payload.jacket.id
  );
  const { isLoading: isLoadingVehile, data: vehicleDetails } = useVehicle(
    get(auction, "payload.vehicles.0.id")
  );
  const isLoading = isLoadingDeal || isLoadingVehile;

  const profit = useMemo(() => {
    const financialProducts = sum(
      get(dealDetails, "_source.payload.financial_products", []).map(
        ({ display }: { display: { dlpProfit?: number } }) =>
          get(display, "dlpProfit", 0)
      )
    );

    const paymentMethod = get(
      dealDetails,
      "_source.payload.personal_details.payment_method",
      "cash"
    );
    const stockType = get(vehicleDetails, "_source.payload.stock_type", "new");
    const terms = get(
      dealDetails,
      "_source.payload.payment_summary.loan_terms",
      0
    );

    if (paymentMethod === "cash") {
      return financialProducts;
    }
    let amount = get(vehicleDetails, "_source.payload.msrp", 0);
    if (stockType.toLowerCase() === "used") {
      amount = get(
        dealDetails,
        "_source.payload.payment_summary.vehicle_budget",
        0
      );
    }
    return sum([financialProducts, amount * 0.0125 * (terms / 12)]);
  }, [dealDetails, vehicleDetails]);

  return (
    <>
      {isLoading ? (
        <>...</>
      ) : (
        formatNumber(profit, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      )}
    </>
  );
};

export default BackendProfit;
