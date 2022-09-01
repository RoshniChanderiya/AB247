import { MapPin } from "@/assets/images";
import CircularProgressBar from "@/components/CircularProgress";
import Timer from "@/components/Timer";
import { DEFAULT_DATE_TIME_FORMAT } from "@/constants";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface AuctionScheduleProps {
  isLive: boolean;
  isWaiting: boolean;
  startTime?: string;
  timer?: number;
  expirationTime?: number;
}

const WaitingSign: React.FC<Pick<AuctionScheduleProps, "expirationTime">> = ({
  expirationTime,
}) => {
  const [percent, setPercent] = useState(0);
  const ref = useRef({
    getTime: () => 0,
  });
  const timer = useMemo(
    () => dayjs(expirationTime).diff(dayjs(), "seconds"),
    [expirationTime]
  );

  useEffect(() => {
    const intrval = setInterval(() => {
      if (ref.current) {
        const timeElapsed = timer - ref.current.getTime();
        setPercent(100 - (timeElapsed / timer) * 100);
      }
    }, 500);

    return () => {
      clearInterval(intrval);
    };
  }, [timer, ref]);

  return (
    <div>
      <p className={styles.profile}>WAITING ON BUYERS SIGNATURE</p>
      <h5 className={styles.dateAndTime}>
        <CircularProgressBar
          squareSize={40}
          percentage={percent}
          strokeWidth={4}
        />
        <Timer timeInSeconds={timer} ref={ref} />
      </h5>
    </div>
  );
};

const AuctionSchedule: React.FC<AuctionScheduleProps> = ({
  isLive,
  isWaiting,
  startTime,
  expirationTime,
  timer,
}) => {
  return (
    <>
      {!isLive && !isWaiting && (
        <>
          <p className={styles.profile}>AUCTION SCHEDULE</p>
          <h5 className={styles.dateAndTime}>
            {dayjs(startTime).format(DEFAULT_DATE_TIME_FORMAT)}
          </h5>
        </>
      )}
      {isWaiting && <WaitingSign expirationTime={expirationTime} />}
      {isLive && (
        <div>
          <p className={styles.profile}>AUCTION SCHEDULE</p>
          <h5 className={styles.dateAndTime}>
            <Timer timeInSeconds={(timer || 0) / 1000} />
            <span className={styles.livebutton}>
              <MapPin size={20} color="white" />
              <span className="ms-2"> Live</span>
            </span>
          </h5>
        </div>
      )}
    </>
  );
};

export default AuctionSchedule;
