import { useState } from "react";
import Button from "src/components/Button";

export const TestStackModal1 = () => {
  const [counter, setCounter] = useState(0);

  return (
    <h1>
      Modal 1 {counter}
      <Button onClick={() => setCounter(counter + 1)}>increment</Button>
    </h1>
  );
};
