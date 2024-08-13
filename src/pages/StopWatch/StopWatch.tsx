import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import classes from "./StopWatch.module.scss";
import styles from "../../designSystem/_classes.module.scss";

const StopWatch = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [lapTime, setLapTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [timerActive, setTimerActive] = useState(false);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [accumulatedLapTime, setAccumulatedLapTime] = useState(0);
  const [activeLap, setActiveLap] = useState(1);
  const [lapArr, setLapArr] = useState<any>([]);
  const [redIndex, setRedIndex] = useState(null);
  const [greenIndex, setGreenIndex] = useState(null);

  const intervalRef = useRef<any>(null);
  const startTimeRef = useRef<number | null>(null);
  const lapStartTimeRef = useRef<number | null>(null);

  const updateTime = (elapsedTime: number) => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const milliseconds = Math.floor(elapsedTime % 1000);

    setTime({ minutes, seconds, milliseconds });
  };

  const updateLapTime = (lapElapsedTime: number) => {
    const lapTotalSeconds = Math.floor(lapElapsedTime / 1000);
    const lapSeconds = lapTotalSeconds % 60;
    const lapMinutes = Math.floor(lapTotalSeconds / 60);
    const lapMilliseconds = Math.floor(lapElapsedTime % 1000);

    setLapTime({
      minutes: lapMinutes,
      seconds: lapSeconds,
      milliseconds: lapMilliseconds,
    });
  };

  const startClickHandler = () => {
    setTimerActive(true);

    if (lapArr.length === 0) {
      setLapArr([
        {
          lapId: 1,
          lap: "Lap 1",
          minutes: 0,
          seconds: 0,
          milliSeconds: 0,
        },
      ]);
    }

    if (!startTimeRef.current) {
      // Set startTimeRef only if it's not already set (i.e., if it's the first start)
      startTimeRef.current = performance.now();
      lapStartTimeRef.current = performance.now();
    } else {
      // Adjust startTimeRef for resumed time
      startTimeRef.current = performance.now() - accumulatedTime;
      lapStartTimeRef.current = performance.now() - accumulatedLapTime;
    }

    intervalRef.current = setInterval(() => {
      const elapsedTime = performance.now() - (startTimeRef.current || 0);
      const lapElapsedTime = performance.now() - (lapStartTimeRef.current || 0); // Lap specific elapsed time

      updateTime(elapsedTime);

      // Update lap-specific times
      updateLapTime(lapElapsedTime);
    }, 1);
  };

  const stopClickHandler = () => {
    if (timerActive) {
      setAccumulatedTime(performance.now() - (startTimeRef.current || 0));
      setAccumulatedLapTime(performance.now() - (lapStartTimeRef.current || 0));
      setTimerActive(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetClickHandler = () => {
    startTimeRef.current = null;
    lapStartTimeRef.current = null;

    setLapArr([]);
    setTimerActive(false);
    clearInterval(intervalRef.current);
    setAccumulatedTime(0);
    setActiveLap(1);
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setLapTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setGreenIndex(null);
    setRedIndex(null);
  };

  const lapClickHandler = () => {
    let tempLapArr =
      lapArr.length > 0
        ? lapArr.map((a: any) => {
            return { ...a };
          })
        : [];

    let maxId = tempLapArr.reduce((acc: any, el: any) => {
      if (el.lapId > acc) {
        acc = el.lapId;
      }
      return acc;
    }, 1);

    tempLapArr = tempLapArr.map((el: any) => {
      if (el.lapId === maxId) {
        return {
          ...el,
          minutes: lapTime.minutes,
          seconds: lapTime.seconds,
          milliSeconds: lapTime.milliseconds,
        };
      } else {
        return el;
      }
    });

    if (tempLapArr.length > 1) {
      let convertedArr = tempLapArr.map((el: any) => {
        return {
          lapId: el.lapId,
          milliSeconds:
            el.milliSeconds + el.seconds * 1000 + el.minutes * 60 * 1000,
        };
      });

      let greenIndexVal = [...convertedArr].sort(
        (a: any, b: any) => a.milliSeconds - b.milliSeconds
      )[0].lapId;
      let redIndexVal = [...convertedArr].sort(
        (a: any, b: any) => b.milliSeconds - a.milliSeconds
      )[0].lapId;

      setGreenIndex(greenIndexVal);
      setRedIndex(redIndexVal);
    }

    tempLapArr = [
      {
        lapId: maxId + 1,
        lap: `Lap ${maxId + 1}`,
        minutes: 0,
        seconds: 0,
        milliSeconds: 0,
      },
      ...tempLapArr,
    ];

    setLapArr([...tempLapArr]);

    setActiveLap((prevValue) => {
      return prevValue + 1;
    });

    // Reset lap start time for the new lap
    lapStartTimeRef.current = performance.now();
    setLapTime({ minutes: 0, seconds: 0, milliseconds: 0 });
  };

  const formatTime = (time: number, length: number) =>
    String(time).padStart(length, "0");

  return (
    <div className={classes["stopwatch-container-wrapper"]}>
      <div className={classes["stopwatch-container-child"]}>
        <div className={classes["stopwatch-container"]}>
          <div>{formatTime(time.minutes, 2)}</div>:
          <div>{formatTime(time.seconds, 2)}</div>
          <span>.</span>
          <div>{formatTime(time.milliseconds, 3)}</div>
        </div>
        <div className={classes["stopwatch-btn-container"]}>
          <Button
            btnText={timerActive ? "Lap" : "Reset"}
            shape="Circular"
            btnClickHandler={timerActive ? lapClickHandler : resetClickHandler}
          />
          <Button
            btnText={timerActive ? "Stop" : "Start"}
            shape="Circular"
            btnStyles={
              timerActive
                ? {
                    color: "rgb(255, 0, 0)",
                    backgroundColor: "rgba(255, 0, 0, 0.18)",
                  }
                : {
                    color: "rgb(0, 188, 0)",
                    backgroundColor: "rgba(0, 188, 0, 0.2)",
                  }
            }
            btnClickHandler={timerActive ? stopClickHandler : startClickHandler}
          />
        </div>
        <div
          className={classes["separator"]}
          style={lapArr.length > 0 ? { opacity: 100 } : { opacity: 0 }}
        ></div>
        <div
          className={`${classes["stopwatch-lap-container"]} ${styles["hide-scrollbar"]}`}
        >
          {lapArr.map((lap: any, index: number) => {
            return (
              <>
                <div className={classes["lap-container-element"]}>
                  <div
                    className={classes["lap-container-element-text"]}
                    style={
                      greenIndex === lap.lapId
                        ? { color: "rgb(0, 188, 0)" }
                        : redIndex === lap.lapId
                        ? { color: "rgb(255,0,0)" }
                        : {}
                    }
                  >
                    {lap.lap}
                  </div>
                  {activeLap === lap.lapId ? (
                    <div
                      className={classes["lap-container-element-value"]}
                      style={
                        greenIndex === lap.lapId
                          ? { color: "rgb(0, 188, 0)" }
                          : redIndex === lap.lapId
                          ? { color: "rgb(255,0,0)" }
                          : {}
                      }
                    >
                      <div>{formatTime(lapTime.minutes, 2)}</div>:
                      <div>{formatTime(lapTime.seconds, 2)}</div>
                      <span>.</span>
                      <div>{formatTime(lapTime.milliseconds, 3)}</div>
                    </div>
                  ) : (
                    <div className={classes["lap-container-element-value"]}>
                      {formatTime(lap.minutes, 2)}:{formatTime(lap.seconds, 2)}:
                      {formatTime(lap.milliSeconds, 3)}
                    </div>
                  )}
                </div>
                <div className={classes["ele-separator"]}></div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
