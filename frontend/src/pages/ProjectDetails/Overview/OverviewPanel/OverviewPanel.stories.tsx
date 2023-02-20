import { ComponentStory } from "@storybook/react";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { User } from "src/types";

import OverviewPanel from ".";

export default {
  title: "OverviewPanel",
};

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
      email: "le@chinoix.fr",
      displayName: "lechinoix",
      avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
    } as unknown as User,
    githubUserId: 123,
  };
  return <AuthContext.Provider value={mockedValue}>{children}</AuthContext.Provider>;
};

const Template: ComponentStory<typeof OverviewPanel> = args => (
  <MockAuthProvider>
    <OverviewPanel {...args} />
  </MockAuthProvider>
);
export const Default = Template.bind({});

Default.args = {
  contributors: [
    { login: "ofux", avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4" },
    { login: "tdelabro", avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4" },
    { login: "anthonybuisset", avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4" },
    { login: "bernardstanislas", avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4" },
    { login: "oscarwroche", avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4" },
  ],
  lead: {
    displayName: "Oscar Roche",
    avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  },
  totalSpentAmountInUsd: 135642,
};
