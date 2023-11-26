import Register from "src/libs/react-stack/components/Register";
import ReactStackprovider from "src/libs/react-stack/reactStackContext";
import { TestStack } from "./Test";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";

export const Stacks = () => {
  // {//pierre /* 16590657 */}
  return (
    <>
      <ReactStackprovider>
        <Register name="modal-1">
          {({ params }) => (
            <>
              <TestStack />
              <ContributorProfileSidePanel githubUserId={params?.id} setOpen={() => null} />
            </>
          )}
        </Register>
        <Register name="modal-2">
          {() => (
            <>
              <div>Modal2</div>
              <TestStack />
            </>
          )}
        </Register>
        <Register name="modal-3">
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
