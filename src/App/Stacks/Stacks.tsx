import { TestStack } from "./Test";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";
import { RegisterStack, StackProvider } from "src/libs/react-stack";

export interface StackRouterParams {
  modal1: {
    githubUserId: number;
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
      <StackProvider>
        <RegisterStack<StackRouterParams["modal1"]> name={StackRoute.modal1}>
          {({ params }) => (
            <>
              <TestStack />
              <ContributorProfileSidePanel githubUserId={params?.githubUserId} />
            </>
          )}
        </RegisterStack>
        <RegisterStack name={StackRoute.modal2}>
          {() => (
            <>
              <div>Modal2</div>
              <TestStack />
            </>
          )}
        </RegisterStack>
        <RegisterStack name={StackRoute.modal3}>
          {() => (
            <>
              <div>Modal3</div>
              <TestStack />
            </>
          )}
        </RegisterStack>
        <TestStack />
      </StackProvider>
    </>
  );
};
