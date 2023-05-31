/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { User } from "src/types";

type Props = {
  userId?: string;
};

export default function withAuthProvider(props: Props = {}) {
  const { userId = "user-id" } = props;

  return (Story: StoryFn) => {
    const mockedValue: AuthContextType = {
      isLoggedIn: true,
      ledProjectIds: [],
      login: () => {
        return;
      },
      logout: () => Promise.resolve(),
      roles: [],
      user: {
        id: userId,
        email: "le@chinoix.fr",
        login: "lechinoix",
        avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
      } as User,
      githubUserId: 123,
      invalidImpersonation: false,
      impersonating: false,
    };
    return (
      <AuthContext.Provider value={mockedValue}>
        <Story />
      </AuthContext.Provider>
    );
  };
}
