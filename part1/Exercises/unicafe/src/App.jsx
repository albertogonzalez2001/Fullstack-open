import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const averageScore = (good * 1 + neutral * 0 + bad * -1) / total;
  const positivePercent = (good * 100) / total;

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(updatedNeutral + good + bad);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(updatedBad + good + neutral);
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h2>Statistics</h2>
      <Statistics type="Good" total={good} />
      <Statistics type="Neutral" total={neutral} />
      <Statistics type="Bad" total={bad} />
      <Statistics type="All" total={total} />
      <Statistics type="Average" total={averageScore} />
      <Statistics type="Positive" total={positivePercent} />
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = (props) => {
  return (
    <div>
      {props.type} {props.total}
    </div>
  );
};

export default App;
