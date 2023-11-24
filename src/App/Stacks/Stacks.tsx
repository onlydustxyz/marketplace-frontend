import Register from "src/libs/react-stack/components/Register";
import ReactStackprovider from "src/libs/react-stack/reactStackContext";
import { TestStack } from "./Test";
import { TestStackModal1 } from "./TestModal1";

export const Stacks = () => {
  return (
    <>
      <ReactStackprovider>
        <Register name="modal-1">
          <>
            <div>Modal1</div>
            <TestStack />
            <TestStackModal1 />
          </>
        </Register>
        <Register name="modal-2">
          <>
            <div>Modal2</div>
            <TestStack />
          </>
        </Register>
        <Register name="modal-3">
          <>
            <div>Modal3</div>
            <TestStack />
          </>
        </Register>
        <TestStack />
      </ReactStackprovider>
    </>
  );
};
