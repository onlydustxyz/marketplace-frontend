/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { StackProvider } from "../../src/libs/react-stack";
import { Stacks } from "../../src/App/Stacks/Stacks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "../../src/hooks/useIntl";
import { SidePanelStackProvider } from "../../src/hooks/useSidePanelStack";
import { SessionProvider } from "src/hooks/useSession";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { ToasterProvider } from "src/hooks/useToaster";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { SidePanelProvider } from "src/hooks/useSidePanel";

const queryClient = new QueryClient();

export default function withContextProviders() {

  return (Story: StoryFn) => {

    return (
      <IntlProvider>
        <SessionProvider>
          <ImpersonationClaimsProvider>
            <TokenSetProvider>
              <ToasterProvider>
                <ApolloWrapper>
                  <QueryClientProvider client={queryClient}>
                      <StackProvider>
                        <SidePanelStackProvider>
                          <SidePanelProvider>
                            <Stacks />
                            <Story />
                          </SidePanelProvider>
                        </SidePanelStackProvider>
                      </StackProvider>
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
