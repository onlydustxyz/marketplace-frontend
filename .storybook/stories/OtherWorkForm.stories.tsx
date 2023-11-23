import { MockedResponse } from "@apollo/client/testing";
import { GetProjectReposDocument, GetProjectReposQueryResult } from "src/__generated/graphql";
import OtherWorkForm from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/OtherWorkForm";
import withAuthProvider from "../decorators/withAuthProvider";
import withFormProvider from "../decorators/withFormProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import withToasterProvider from "../decorators/withToasterProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";
const PROJECT_ID = "project-1";

const mocks: MockedResponse[] = [
  {
    request: {
      query: GetProjectReposDocument,
      variables: { projectId: PROJECT_ID },
    },
    result: {
      data: {
        projects: [
          {
            githubRepos: [
              {
                repo: {
                  id: 123456,
                  owner: "owner-1",
                  name: "first-repo",
                },
              },
              {
                repo: {
                  id: 123456,
                  owner: "owner-1",
                  name: "second-repo",
                },
              },
            ],
          },
        ],
      } as GetProjectReposQueryResult["data"],
    },
  },
];

export default {
  title: "OtherWorkForm",
  component: OtherWorkForm,
  decorators: [
    withToasterProvider,
    withMockedProvider(mocks),
    withAuthProvider({ userId: USER_ID }),
    withFormProvider(),
  ],
};

export const Default = {
  render: () => <OtherWorkForm projectId={PROJECT_ID} contributorHandle="ofux" addWorkItem={Function.prototype()} />,
};
