import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { FormProvider, useForm } from "react-hook-form";
import { GET_USER_IDENTITY_QUERY } from "src/App/Layout/Header/FeedbackButton";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { ToasterProvider } from "src/hooks/useToaster";
import { User } from "src/types";
import { GetProjectReposDocument, GetProjectReposQueryResult } from "src/__generated/graphql";
import OtherWorkForm from ".";

export default {
  title: "OtherWorkForm",
  component: OtherWorkForm,
};

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";
const PROJECT_ID = "project-1";

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockedValue: AuthContextType = {
    isLoggedIn: true,
    ledProjectIds: [],
    login: () => {
      return;
    },
    logout: () => Promise.resolve(),
    roles: [],
    user: {
      id: USER_ID,
      email: "le@chinoix.fr",
      displayName: "lechinoix",
      avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
    } as unknown as User,
    githubUserId: 123,
    invalidImpersonation: false,
    impersonating: false,
  };
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <AuthContext.Provider value={mockedValue}>{children}</AuthContext.Provider>
    </FormProvider>
  );
};

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_USER_IDENTITY_QUERY,
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
        projectsByPk: {
          githubRepos: [
            {
              githubRepoDetails: {
                id: 123456,
                content: { __typename: "Repo", owner: "owner-1", name: "first-repo" },
              },
            },
            {
              githubRepoDetails: {
                id: 123456,
                content: { __typename: "Repo", owner: "owner-1", name: "second-repo" },
              },
            },
          ],
        },
      },
    } as GetProjectReposQueryResult,
  },
];

export const Default = {
  render: () => (
    <MockedProvider mocks={mocks}>
      <MockAuthProvider>
        <ToasterProvider>
          <OtherWorkForm projectId={PROJECT_ID} contributorHandle="ofux" onWorkItemAdded={Function.prototype()} />
        </ToasterProvider>
      </MockAuthProvider>
    </MockedProvider>
  ),
};
