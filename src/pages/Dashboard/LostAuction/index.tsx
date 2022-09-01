import Button from "@/components/Button";
import { AuctionSubHeaderProps } from "@/pages/Auctions/AuctionListSubHeader";
import LostAuctions from "@/pages/Auctions/LostAuctions";
import classNames from "classnames";
import React, { useState } from "react";
import { ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";

const LostAuction: React.FC = () => {
  const [duration, setDuration] =
    useState<AuctionSubHeaderProps["selectedDuration"]>("week");

  return (
    <>
      <div className={classNames(styles.header, "px-4 mx-0")}>
        <div className={classNames(styles.listGridContainer)}>
          <ButtonGroup>
            <Button
              color="primary"
              outline
              className={classNames(styles.monthBtn, {
                [styles.active]: duration === "week",
              })}
              onClick={() => setDuration("week")}
            >
              Week
            </Button>
            <Button
              color="primary"
              outline
              className={classNames(styles.monthBtn, {
                [styles.active]: duration === "month",
              })}
              onClick={() => setDuration("month")}
            >
              Month
            </Button>
            <Button
              color="primary"
              outline
              className={classNames(styles.monthBtn, {
                [styles.active]: duration === "3months",
              })}
              onClick={() => setDuration("3months")}
            >
              3 Months
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <LostAuctions duration={duration} isSummary />
    </>
  );
};

export default LostAuction;
