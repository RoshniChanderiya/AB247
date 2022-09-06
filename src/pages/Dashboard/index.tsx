import { AppRoutes } from "@/constants";
import { Col, Row } from "reactstrap";
// import AllInventory from "./AllInventory";
import NewDealIndicator from "./Indicator";
import LiveAuction from "./LiveAuction";
// import LostAuction from "./LostAuction";
import Sidebar from "./Sidebar";
import NewDeals from "./NewDeal";
import PendingDeals from "./PendingDeals";
import TableContainer from "./TableContainer";
import AllInventory from "./AllInventory";
import LostAuction from "./LostAuction";

const Dashboard: React.FC = () => {
  return (
    <Row className="w-100 m-0">
      <Col lg={9} className="p-4">
        <Row>
          <Col lg="3">
            <NewDealIndicator />
          </Col>
          <Col lg="9" className="p-0">
            <TableContainer title="New Deals" footerLink={AppRoutes.NEW_DEALS}>
              <NewDeals />
            </TableContainer>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="mt-3 p-0">
            <TableContainer
              title="Live Auction"
              footerLink={AppRoutes.LIVE_AUCTIONS}
            >
              <LiveAuction />
            </TableContainer>
          </Col>

          <Col lg={12} className="mt-3 p-0">
            <TableContainer
              title="Pending Deals"
              footerLink={AppRoutes.PENDING_DEALS}
            >
              <PendingDeals />
            </TableContainer>
          </Col>
          <Col lg={12} className="mt-3 p-0">
            <TableContainer title="All Inventory" footerLink="inventory">
              <AllInventory />
            </TableContainer>
          </Col>
          <Col lg={12} className="mt-3 p-0">
            <TableContainer
              title="Lost Auction"
              footerLink={AppRoutes.LOST_AUCTIONS}
            >
              <LostAuction />
            </TableContainer>
          </Col>
        </Row>
      </Col>
      <Col lg={3} className="p-0">
        <Sidebar />
      </Col>
    </Row>
  );
};

export default Dashboard;
