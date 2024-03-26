import { useRef, useState } from "react";

export default function Player() {
  const name = useRef("");
  const [enteredName, setEnteredName] = useState("");

  const handleClick = () => {
    setEnteredName(name.current.value);
    name.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {enteredName}</h2>
      <p>
        <input ref={name} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
