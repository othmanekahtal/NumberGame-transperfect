import { useCallback, useRef, useState } from "react";
import "./App.css";
import type { FormEventHandler } from "react";
function randomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
function App() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [message, setMessage] = useState("Start guessing...");
  const [isGuessed, setIsGuessed] = useState(false);
  const [guessedNumber, setGuessedNumber] = useState<number>(randomNumber);

  console.log({ guessedNumber });

  const refContainer = useRef<HTMLDivElement>(null);
  const check: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    refContainer.current?.classList.remove("win-background");
    if (guessedNumber === inputValue) {
      setIsGuessed(true);
      setMessage("You win!");
      refContainer.current?.classList.add("win-background");
    } else if (guessedNumber < inputValue) {
      setMessage("Try again! Your guess was too high.");
    } else {
      setMessage("Try again! Your guess was too low.");
    }
  };
  const onReset = () => {
    setGuessedNumber(randomNumber);
    setIsGuessed(false);
    setMessage("Start guessing...");
    setInputValue(0);
    refContainer.current?.classList.remove("win-background");
  };
  return (
    <div className="main" ref={refContainer}>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 100)</p>
        <button className="btn again" onClick={onReset}>
          Again!
        </button>
        <div className="number">{isGuessed ? guessedNumber : "?"}</div>
      </header>
      <main>
        <form className="left" onSubmit={check}>
          <input
            type="number"
            className="guess"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.valueAsNumber);
            }}
          />
          <button className="btn check">Check!</button>
        </form>
        <section className="right">
          <p className="message">{message}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
