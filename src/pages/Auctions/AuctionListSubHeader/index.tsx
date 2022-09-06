import { AlertTriangle, GridIcon, Menu, Search } from "@/assets/images";
import Button from "@/components/Button";
import Link from "@/components/Link";
import Space from "@/components/Space";
import { TableRef } from "@/components/Table";
import ThemeInput from "@/components/ThemeInput";
import { AppRoutes, AUCTION_STATES } from "@/constants";
import useWindowDimentions from "@/hooks/useWindowDimensions";
import { AuctionState } from "@/types/auction";
import { ListViewType } from "@/types/generic";
import classNames from "classnames";
import upperFirst from "lodash/upperFirst";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";

export interface AuctionSubHeaderProps {
  state: AuctionState;
  view?: ListViewType;
  setView?: (value: ListViewType) => void;
  total?: {
    live: number;
    waiting: number;
  };
  underBidCount?: number;
  selectedDuration?: "week" | "month" | "3months";
  onDurationChange?: (value: "week" | "month" | "3months") => void;
}
const AuctionListSubHeader: React.FC<AuctionSubHeaderProps> = ({
  state,
  view,
  setView,
  total,
  underBidCount,
  selectedDuration: duration,
  onDurationChange,
}) => {
  const { width } = useWindowDimentions();
  const ref = useRef<TableRef>({});

  useEffect(() => {
    if (setView) {
      width < 1200 ? setView("grid") : setView("table");
    }
  }, [width, setView]);

  const toggleView = (value: ListViewType) => {
    setView?.(value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current && ref.current.search) {
      ref.current.search(e.target.value);
    }
  };

  return (
    <>
      <div className={classNames(styles.header, "px-4 mx-0")}>
        <div className={styles.searchContainer}>
          <h5 className={styles.title}>
            {upperFirst(state === "completed" ? "lost" : state)} Auctions
          </h5>
          {[AUCTION_STATES.live, AUCTION_STATES.expiring].includes(state) && (
            <Space>
              <Link to={AppRoutes.LIVE_AUCTIONS}>
                <Button
                  color="secondary"
                  variant="black"
                  active={state === AUCTION_STATES.live}
                >
                  {total?.live} LIVE AUCTIONS
                </Button>
              </Link>
              <div className={styles.badgeBlock}>
                <Link to={AppRoutes.AWAITED_AUCTIONS}>
                  <Button
                    color="secondary"
                    variant="black"
                    active={state === AUCTION_STATES.expiring}
                  >
                    {total?.waiting} WAITING SIGNATURE
                  </Button>
                  <span className={styles.badge}>{total?.waiting}</span>
                </Link>
              </div>
            </Space>
          )}

          <div
            className={classNames("position-relative", styles.inputContainer, {
              [styles.live]: [
                AUCTION_STATES.live,
                AUCTION_STATES.expiring,
              ].includes(state),
              [styles.scheduled]: state === AUCTION_STATES.scheduled,
              [styles.completed]: state === AUCTION_STATES.completed,
            })}
          >
            <ThemeInput
              label=""
              block
              placeholder="Search auctions"
              type="search"
              aria-label="Search"
              onChange={onChange}
              className={styles.inputBox}
              groupProps={{
                className: styles.group,
              }}
            />
            <Search className={styles.searchIcon} />
          </div>
          <div className={classNames(styles.rightPart, "mt-3")}>
            {[AUCTION_STATES.live, AUCTION_STATES.expiring].includes(state) &&
              underBidCount && (
                <div className="me-2 mb-3">
                  <span className={styles.alertbutton}>
                    <AlertTriangle color="white" size={20} />
                    <span className="ms-2 my-auto">{underBidCount}</span>
                  </span>
                </div>
              )}
            <div
              className={classNames(styles.listGridContainer, "ms-3", "mb-3")}
            >
              {state === AUCTION_STATES.completed && (
                <ButtonGroup>
                  <Button
                    color="primary"
                    outline
                    className={classNames(styles.monthBtn, {
                      [styles.active]: duration === "week",
                    })}
                    onClick={() => onDurationChange?.("week")}
                  >
                    Week
                  </Button>
                  <Button
                    color="primary"
                    outline
                    className={classNames(styles.monthBtn, {
                      [styles.active]: duration === "month",
                    })}
                    onClick={() => onDurationChange?.("month")}
                  >
                    Month
                  </Button>
                  <Button
                    color="primary"
                    outline
                    className={classNames(styles.monthBtn, {
                      [styles.active]: duration === "3months",
                    })}
                    onClick={() => onDurationChange?.("3months")}
                  >
                    3 Months
                  </Button>
                </ButtonGroup>
              )}
              {state !== AUCTION_STATES.completed && (
                <>
                  <span
                    className={classNames(styles.view, {
                      [styles.active]: view === "table",
                      [styles.inactive]: view === "grid",
                    })}
                    onClick={() => toggleView("table")}
                    role="button"
                  >
                    <Menu />
                  </span>
                  <span
                    className={classNames(styles.view, {
                      [styles.active]: view === "grid",
                      [styles.inactive]: view === "table",
                    })}
                    onClick={() => toggleView("grid")}
                    role="button"
                  >
                    <GridIcon />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionListSubHeader;
