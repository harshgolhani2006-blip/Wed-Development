import { useState } from "react";

const UseCounter = (data = 0) => {
  const [count, setCount] = useState(data=0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(data);

  return { count, increment, decrement, reset };
};

export default UseCounter;