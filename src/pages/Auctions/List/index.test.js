import AppLike from "@/../__tests__/AppLike";
import { AUCTION_STATES } from "@/constants";
import useWindowDimentions from "@/hooks/useWindowDimensions";
import { getAuctions, placeBid, removeVehicle } from "@/services/auction";
import { getVehicle } from "@/services/vehicle";
import { FakeAuction } from "@/types/data/auction";
import { FakeVehicle } from "@/types/data/vehicle";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import upperFirst from "lodash/upperFirst";
import AuctionList from ".";
import { AuctionContext } from "..";
import get from "lodash/get";

jest.mock("@/hooks/useWindowDimensions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/services/auction", () => ({
  getAuctions: jest.fn(),
  placeBid: jest.fn(),
  removeVehicle: jest.fn(),
  getBackendProfit: jest.fn(),
}));

jest.mock("@/services/vehicle", () => ({
  getVehicle: jest.fn(),
}));

jest.mock("@/services/payment", () => ({
  getIncentivePayment: jest.fn(),
}));

jest.mock("@/services/deals", () => ({
  getDeal: jest.fn(),
  getDeals: jest.fn(),
}));

describe("List Auction", () => {
  const setup = (state) =>
    render(
      <AppLike>
        <AuctionContext.Provider value={{ state }}>
          <AuctionList />
        </AuctionContext.Provider>
      </AppLike>
    );

  beforeEach(() => {
    jest.resetAllMocks();
    useWindowDimentions.mockReturnValue({ width: 1600 });
    getAuctions.mockResolvedValue([FakeAuction]);
    getVehicle.mockResolvedValue(FakeVehicle);
  });

  it.each([AUCTION_STATES.scheduled, AUCTION_STATES.live])(
    "renders table view for %s auctions",
    async (state) => {
      setup(state);

      expect(
        screen.getByText(`${upperFirst(state)} Auctions`)
      ).toBeInTheDocument();

      await waitFor(() =>
        expect(getAuctions).toHaveBeenCalledWith({
          state: state === AUCTION_STATES.live ? ["live", "expiring"] : [state],
        })
      );

      expect(
        await screen.findByText(
          `${get(FakeAuction, "payload.vehicles[0].days_on_market")} Days`
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          get(FakeAuction, "payload.vehicles[0].exterior_color_category")
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(get(FakeAuction, "payload.vehicles[0].vin"))
      ).toBeInTheDocument();

      expect(
        await screen.findByText(FakeVehicle._source.payload.model)
      ).toBeInTheDocument();
    }
  );

  it("changes the view from table to grid for %s auctions", async () => {
    setup(AUCTION_STATES.scheduled);
    await waitFor(() =>
      expect(
        screen.getByText(
          `${FakeAuction.payload.vehicles[0].days_on_market} Days`
        )
      ).toBeInTheDocument()
    );
    act(() => fireEvent.click(screen.getAllByRole("button")[1]));
    expect(getVehicle).toHaveBeenCalledWith(FakeAuction.payload.vehicles[0].id);

    await waitFor(() =>
      expect(
        screen.getByText(
          `${FakeVehicle._source.payload.model_year} ${FakeVehicle._source.payload.make} ${FakeVehicle._source.payload.model}`
        )
      ).toBeInTheDocument()
    );

    expect(
      screen.getByText(FakeVehicle._source.payload.vin)
    ).toBeInTheDocument();
  });

  it("place floor bid", async () => {
    setup("scheduled");
    const bidInput = await screen.findByRole("textbox");
    expect(bidInput).toBeInTheDocument();
    fireEvent.change(bidInput, { target: { value: "100" } });
    fireEvent.click(screen.getByRole("button", { name: /update/i }));
    await waitFor(() =>
      expect(placeBid).toHaveBeenCalledWith({
        auctionId: FakeAuction.id,
        bidAmount: "100",
        vin: FakeAuction.payload.vehicles[0].vin,
      })
    );
  });

  it("removes a vehicle from auction", async () => {
    setup(AUCTION_STATES.scheduled);
    const deleteBtn = await screen.findByRole("alert");
    fireEvent.click(deleteBtn);

    const noButton = screen.getByRole("button", { name: /no/i });

    fireEvent.click(noButton);
    expect(removeVehicle).not.toHaveBeenCalled();

    fireEvent.click(deleteBtn);
    const yesButton = await screen.findByRole("button", {
      name: /yes, remove vehicle/i,
    });
    fireEvent.click(yesButton);
    await waitFor(() =>
      expect(removeVehicle).toHaveBeenCalledWith({
        auctionId: FakeAuction.id,
        vehicleId: FakeAuction.payload.vehicles[0].id,
      })
    );
  });
});
