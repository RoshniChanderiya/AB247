import { Auction, AuctionState } from "@/types/auction";
import { Col, Row } from "reactstrap";
import GridCard from "./GridCard";

interface GridProps {
  auctions: Auction[];
  state: AuctionState;
}

const Grid: React.FC<GridProps> = ({ auctions }) => {
  return (
    <Row className="mx-3">
      {auctions.map((auction) => (
        <Col key={auction.key} xl={4}>
          <GridCard auction={auction} />
        </Col>
      ))}
    </Row>
  );
};

export default Grid;
