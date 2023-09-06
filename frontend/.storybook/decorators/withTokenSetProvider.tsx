/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { TokenSetContext, TokenSetContextType } from "src/hooks/useTokenSet";
import { AccessToken, HasuraUserRole, RefreshToken } from "src/types";

export default function withTokenSetProvider(Story: StoryFn) {
  const mockedValue: TokenSetContextType = {
    clearTokenSet: () => {
      return;
    },
    hasRefreshError: false,
    setFromRefreshToken: async () => {
      return;
    },
    setHasRefreshError: () => {
      return;
    },
    setTokenSet: () => {
      return;
    },
    tokenSet: {
      accessToken: "" as AccessToken,
      accessTokenExpiresIn: 0,
      creationDate: new Date(),
      refreshToken: "" as RefreshToken,
      user: {
        activeMfaType: null,
        createdAt: new Date(),
        defaultRole: HasuraUserRole.Public,
        email: "",
        emailVerified: true,
        id: "",
        isAnonymous: true,
        locale: "en",
        phoneNumber: null,
        phoneNumberVerified: true,
        roles: [],
      },
    },
  };

  return (
    <TokenSetContext.Provider value={mockedValue}>
      <Story />
    </TokenSetContext.Provider>
  );
}
