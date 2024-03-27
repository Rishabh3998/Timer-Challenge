import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }, ref) => {
    // Forwarding ref
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round(1 - (remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });

    return (
      <dialog className="result-modal" ref={dialog}>
        {userLost ? <h2>You lost</h2> : <h2>You win score: {score}</h2>}
        <p>
          The target time was
          <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{formattedTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

export default ResultModal;
