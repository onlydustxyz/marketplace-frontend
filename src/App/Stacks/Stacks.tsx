import Register from "src/libs/react-stack/components/Register";
import ReactStackprovider from "src/libs/react-stack/reactStackContext";
import { TestStack } from "./Test";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";

export interface StackRouter {
  modal1: {
    githubUserId: string;
  };
  modal2: {
    id: string;
  };
}

export enum StackRoute {
  modal1 = "modal-1",
  modal2 = "modal-2",
  modal3 = "modal-3",
}

export const Stacks = () => {
  return (
    <>
      <ReactStackprovider>
        <Register name={StackRoute.modal1}>
          {({ params }) => (
            <>
              <TestStack />
              <ContributorProfileSidePanel githubUserId={params?.id} setOpen={() => null} />
            </>
          )}
        </Register>
        <Register name={StackRoute.modal2}>
          {() => (
            <>
              <div>Modal2</div>
              <TestStack />
            </>
          )}
        </Register>
        <Register name={StackRoute.modal3}>
          {() => (
            <>
              <div>Modal3</div>
              <TestStack />
            </>
          )}
        </Register>
        <TestStack />
      </ReactStackprovider>
    </>
  );
};
