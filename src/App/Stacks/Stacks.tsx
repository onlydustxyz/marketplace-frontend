import Register from "src/libs/react-stack/components/Register";
import ReactStackprovider from "src/libs/react-stack/reactStackContext";
import { TestStack } from "./Test";

export const Stacks = () => {
  return (
    <>
      <ReactStackprovider>
        <Register name="modal-1">
          <div>cuocu</div>
        </Register>
        <Register name="modal-2">
          <div>cuocu</div>
        </Register>
        <TestStack />
      </ReactStackprovider>
    </>
  );
};
