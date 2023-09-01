/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { User } from "src/types";

type Props = {
  userId?: string;
  githubUserId?: number;
};

export default function withAuthProvider(props: Props = {}) {
  const { userId = "user-id", githubUserId = 10167015 } = props;

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
        avatarUrl: `https://avatars.githubusercontent.com/u/${githubUserId}?v=4`,
      } as User,
      githubUserId,
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
