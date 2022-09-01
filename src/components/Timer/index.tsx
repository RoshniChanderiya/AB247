import classNames from "classnames";
import padStart from "lodash/padStart";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface TimerProps {
  timeInSeconds: number;
}
const Timer: React.ForwardRefRenderFunction<
  { getTime: () => number },
  TimerProps
> = ({ timeInSeconds }, ref) => {
  const [time, setTime] = useState(timeInSeconds > 0 ? timeInSeconds : 0);
  const interval = useRef<any>();

  useEffect(() => {
    setTime(timeInSeconds > 0 ? timeInSeconds : 0);
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [timeInSeconds]);

  useImperativeHandle(ref, () => ({
    getTime: () => time,
  }));
  const hours = Math.floor(time / 3600);
  const totalSeconds = time % 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div
      className={classNames({
        [styles.danger]: totalSeconds < 6000,
      })}
    >
      {padStart(String(hours), 2, "0")}:{padStart(String(minutes), 2, "0")}:
      {padStart(String(seconds), 2, "0")}
    </div>
  );
};

export default React.forwardRef(Timer);
