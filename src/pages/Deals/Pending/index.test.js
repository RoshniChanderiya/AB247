import AppLike from "@/../__tests__/AppLike";
import { fireEvent, render, screen } from "@testing-library/react";
import PendingDeals from ".";

jest.mock("@/services/deals", () => ({
  getDeals: jest.fn(),
}));
describe("Pending Deals", () => {
  const setup = () =>
    render(
      <AppLike>
        <PendingDeals />
      </AppLike>
    );

  it("renders Pending Deals Page", async () => {
    setup();
    expect(screen.getByText("Pending Deals")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("table-search"), {
      target: {
        value: "test",
      },
    });
  });
});
