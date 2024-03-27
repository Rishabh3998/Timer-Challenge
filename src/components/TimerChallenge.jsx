import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timerId = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && targetTime < 1000;
  if (timeRemaining <= 0) {
    clearInterval(timerId.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }
  const handleClick = () => {
    timerId.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
  };

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStop = () => {
    dialog.current.open();
    clearInterval(timerId.current);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleClick}>
            {timerIsActive ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          Timer is {timerIsActive ? "running..." : "expired"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
