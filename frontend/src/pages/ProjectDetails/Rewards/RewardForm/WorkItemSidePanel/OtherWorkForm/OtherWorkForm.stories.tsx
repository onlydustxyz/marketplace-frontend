import { MockedResponse } from "@apollo/client/testing";
import { GetProjectReposDocument, GetProjectReposQueryResult, UserIdentityDocument } from "src/__generated/graphql";
import OtherWorkForm from ".";
import withToasterProvider from "src/test/storybook/decorators/withToasterProvider";
import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import withAuthProvider from "src/test/storybook/decorators/withAuthProvider";
import withFormProvider from "src/test/storybook/decorators/withFormProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";
const PROJECT_ID = "project-1";

const mocks: MockedResponse[] = [
  {
    request: {
      query: UserIdentityDocument,
      variables: { userId: USER_ID },
    },
    result: {
      data: {
        userInfo: [
          {
            identity: {
              Person: {
                lastname: "Bar",
                firstname: "Foo",
              },
            },
          },
        ],
      },
    },
  },
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
  render: () => (
    <OtherWorkForm projectId={PROJECT_ID} contributorHandle="ofux" onWorkItemAdded={Function.prototype()} />
  ),
};
