import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <>
      <h1>Count: {count}</h1>
      {isRunning && <button onClick={handleStop}>Stop</button>}
      {!isRunning && <button onClick={() => setIsRunning(true)}>Start</button>}
    </>
  );
};

export default App;
