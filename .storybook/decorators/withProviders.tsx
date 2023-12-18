/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { StackProvider } from "../../src/libs/react-stack";
import { Stacks } from "../../src/App/Stacks/Stacks";
import { AuthContext, AuthContextType } from "src/hooks/useAuth";
import { User } from "src/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "../../src/hooks/useIntl";
import { SidePanelStackProvider } from "../../src/hooks/useSidePanelStack";
import { SessionProvider } from "src/hooks/useSession";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { ToasterProvider } from "src/hooks/useToaster";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { SidePanelProvider } from "src/hooks/useSidePanel";

type Props = {
  userId?: string;
  githubUserId?: number;
};

const queryClient = new QueryClient();

export default function withContextProviders(props: Props = {}) {
  const { userId = "e2ee731a-2697-4306-bf4b-c807f6fda0d7", githubUserId = 10167015 } = props;

  return (Story: StoryFn) => {
    const mockedAuthValue: AuthContextType = {
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
      <IntlProvider>
        <SessionProvider>
          <ImpersonationClaimsProvider>
            <TokenSetProvider>
              <ToasterProvider>
                <ApolloWrapper>
                  <QueryClientProvider client={queryClient}>
                    <AuthContext.Provider value={mockedAuthValue}>
                      <StackProvider>
                        <SidePanelStackProvider>
                          <SidePanelProvider>
                            <Stacks />
                            <Story />
                          </SidePanelProvider>
                        </SidePanelStackProvider>
                      </StackProvider>
                    </AuthContext.Provider>
                  </QueryClientProvider>
                </ApolloWrapper>
              </ToasterProvider>
            </TokenSetProvider>
          </ImpersonationClaimsProvider>
        </SessionProvider>
      </IntlProvider>
    );
  };
}
