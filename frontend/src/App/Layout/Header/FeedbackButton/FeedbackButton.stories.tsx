import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { User } from "src/types";
import { withRouter } from "storybook-addon-react-router-v6";
import { SuspenseCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";

import FeedbackButton, { GET_USER_IDENTITY_QUERY } from ".";

export default {
  title: "FeedbackButton",
  component: FeedbackButton,
  decorators: [withRouter],
} as ComponentMeta<typeof FeedbackButton>;

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

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
      email: "foo@bar.fr",
      displayName: "foobar",
    } as unknown as User,
    githubUserId: 123,
  };
  return <AuthContext.Provider value={mockedValue}>{children}</AuthContext.Provider>;
};

const mocks = [
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
];

const suspenseCache = new SuspenseCache();

const Template: ComponentStory<typeof FeedbackButton> = () => (
  <MockedProvider mocks={mocks} suspenseCache={suspenseCache}>
    <MockAuthProvider>
      <FeedbackButton />
    </MockAuthProvider>
  </MockedProvider>
);

export const Default = Template.bind({});
