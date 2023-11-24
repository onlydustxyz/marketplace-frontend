import UseWatch from "src/libs/react-stack/hooks/useWatch";

export const TestStackModal1 = () => {
  const stack = UseWatch("modal-1");

  console.log("OPEN", stack);

  return <h1>modal 1</h1>;
};
