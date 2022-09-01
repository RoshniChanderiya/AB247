import { AUCTION_AMOUNT } from "@/constants";
import { isUUID } from "@/utils/generic";
import { formatNumber } from "@/utils/NumberFomatter";
import classNames from "classnames";
import React from "react";
import { Col } from "reactstrap";
import BuyerProfileItem from "./BuyerProfileItem";
import styles from "./styles.module.scss";

interface BuyerProfileProps {
  view: "table" | "grid";
  fico?: number;
  downPayment?: number;
  terms?: number;
  value?: number;
  buyRate: number;
  tradeInId: string;
}

const BuyerProfile: React.FC<BuyerProfileProps> = ({
  downPayment,
  fico,
  terms,
  value,
  view,
  buyRate,
  tradeInId,
}) => {
  const isBlankBuyRate = String(buyRate) === "-";
  const sellRate = !isBlankBuyRate ? buyRate + 1.25 : "-";

  return view === "grid" ? (
    <>
      <p className={styles.profile}>BUYER PROFILE</p>
      <div className={classNames(styles.profileDetails, styles.grid)}>
        <div className={styles.fieldContainer}>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              FICO:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {fico}
            </Col>
          </span>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              Deposit:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {formatNumber(AUCTION_AMOUNT, {
                minimumFractionDigits: 0,
              })}
            </Col>
          </span>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              Down:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {formatNumber(downPayment, {
                minimumFractionDigits: 0,
              })}
            </Col>
          </span>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              Term:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {terms} {terms ? "mo." : ""}
            </Col>
          </span>
        </div>
        <div className={styles.valueContainer}>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              F&I:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {formatNumber(value)}
            </Col>
          </span>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              Buy Rate:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {buyRate}
              {isBlankBuyRate ? "" : "%"}
            </Col>
          </span>
          <span className="d-flex items-center">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              Sell Rate:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {sellRate}
              {isBlankBuyRate ? "" : "%"}
            </Col>
          </span>
          <span className="d-flex">
            <Col lg={6} className={classNames(styles.field, "my-auto")}>
              Trade-In:
            </Col>
            <Col lg={6} className={classNames(styles.value)}>
              {isUUID(tradeInId) ? "Yes" : "No"}
            </Col>
          </span>
        </div>
      </div>
    </>
  ) : (
    <>
      <p className={styles.profile}>BUYER PROFILE</p>
      <div className={classNames(styles.profileDetails, styles.table)}>
        <div className={styles.fieldContainer}>
          <BuyerProfileItem label="FICO" value={String(fico)} />
          <BuyerProfileItem
            label="Deposit"
            value={formatNumber(AUCTION_AMOUNT, {
              minimumFractionDigits: 0,
            })}
          />
          <BuyerProfileItem
            label="Down"
            value={formatNumber(downPayment, {
              minimumFractionDigits: 0,
            })}
          />
          <BuyerProfileItem
            label="Term"
            value={`${terms} ${terms ? "mo." : ""}`}
          />
        </div>
        <div className={styles.rightContainer}>
          <BuyerProfileItem
            label="F&I"
            value={formatNumber(value, {
              minimumFractionDigits: 0,
            })}
          />
          <BuyerProfileItem
            label="Buy Rate"
            value={`${buyRate}${isBlankBuyRate ? "" : "%"}`}
          />
          <BuyerProfileItem
            label="Sell Rate"
            value={`${sellRate}${isBlankBuyRate ? "" : "%"}`}
          />
          <BuyerProfileItem
            label="Trade-In"
            value={isUUID(tradeInId) ? "Yes" : "No"}
          />
        </div>
      </div>
    </>
  );
};

export default BuyerProfile;
