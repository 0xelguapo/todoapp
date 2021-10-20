import { useState, useEffect, useRef } from "react";
import styles from "../styles/Timer.module.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(1500);
  const [timerToggle, setTimerToggle] = useState(true);

  const countdown = () => {
    setSeconds((prevSeconds) => prevSeconds - 1);
  };

  useEffect(() => {
    let interval = null;
    if (timerToggle) {
      interval = setInterval(countdown, 1000);
    } else if (!timerToggle) {
      clearInterval(interval);
    }
    if (seconds <= 0) {
      setSeconds(1500);
    }
    return () => clearInterval(interval);
  }, [timerToggle, seconds]);

  const resetTimer = () => {
    setSeconds(1500);
    setTimerToggle(true);
  };

  const stopTimer = () => {
      setTimerToggle(!timerToggle);
  }

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        {Math.floor(seconds / 3600)} :{" "}
        {("0" + Math.floor(seconds / 60)).slice(-2)} :{" "}
        {("0" + Math.floor(seconds % 60)).slice(-2)}
      </div>
      <div className={styles.controls}>
        {!timerToggle ? (
          <button onClick={stopTimer}className={styles.button}>Start</button>
        ) : (
          <button onClick={stopTimer} className={styles.button}>Stop</button>
        )}
        <button className={styles.resetButton} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
