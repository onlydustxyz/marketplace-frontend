import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RoutePaths } from "src/App";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { User } from "src/types";
import { withRouter } from "storybook-addon-react-router-v6";

import Header from "./View";

export default {
  title: "Header",
  component: Header,
  decorators: [withRouter],
} as ComponentMeta<typeof Header>;

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
      displayName: "lechinoix",
      avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
    } as unknown as User,
    githubUserId: 123,
  };
  return <AuthContext.Provider value={mockedValue}>{children}</AuthContext.Provider>;
};

const Template: ComponentStory<typeof Header> = args => (
  <MockAuthProvider>
    <Header {...args} />
  </MockAuthProvider>
);

export const Default = Template.bind({});

Default.args = {
  menuItems: {
    [RoutePaths.Projects]: "Projects",
    [RoutePaths.MyProjectDetails]: "My Projects",
    [RoutePaths.MyContributions]: "Payments",
  },
  isLoggedIn: false,
  selectedMenuItem: RoutePaths.Projects,
};

Default.parameters = { layout: "fullscreen", backgrounds: { default: "space" } };
