import AppLike from "@/../__tests__/AppLike";
import { getDeals } from "@/services/deals";
import { FakeDeal } from "@/types/data/deal";
import { formatNumber } from "@/utils/NumberFomatter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import get from "lodash/get";
import PendingDeals from ".";

jest.mock("@/services/deals", () => ({ getDeals: jest.fn() }));

describe("New Deals", () => {
  const setup = () =>
    render(
      <AppLike>
        <PendingDeals />
      </AppLike>
    );

  beforeEach(() => {
    getDeals.mockResolvedValue({ data: [FakeDeal], total: 1 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it("renders New Deals Page", async () => {
    setup();
    expect(screen.getByText("New Deals")).toBeInTheDocument();
    await waitFor(() =>
      expect(getDeals).toHaveBeenCalledWith({
        type: "new",
      })
    );
    expect(
      await screen.findByText(
        get(FakeDeal, "_source.payload.personal_details.full_name")
      )
    ).toBeInTheDocument();
    const address = get(FakeDeal, "_source.payload.personal_details.billing");

    expect(
      await screen.findByText(
        formatNumber(get(FakeDeal, "_source.payload.total_amount", 0), {
          minimumFractionDigits: 0,
        })
      )
    ).toBeInTheDocument();
  });

  it("opens sign deal with correct link", async () => {
    setup();
    await waitFor(() =>
      expect(getDeals).toHaveBeenCalledWith({
        type: "new",
      })
    );
    expect(
      await screen.findByText(
        get(FakeDeal, "_source.payload.personal_details.full_name")
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Sign" }));
    const dealIframe = screen.getByTitle("sign the deal");
    expect(dealIframe).toBeInTheDocument();
    expect(dealIframe.src).toBe(
      FakeDeal._source.payload.dealer_recipient.shared_link
    );
  });
});
