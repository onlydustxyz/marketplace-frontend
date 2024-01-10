/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { ToasterProvider } from "src/hooks/useToaster";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { Stacks } from "../../src/App/Stacks/Stacks";
import { IntlProvider } from "../../src/hooks/useIntl";
import { SidePanelStackProvider } from "../../src/hooks/useSidePanelStack";
import { StackProvider } from "../../src/libs/react-stack";

const queryClient = new QueryClient();

export default function withContextProviders() {
  return (Story: StoryFn) => {
    return (
      <IntlProvider>
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
      </IntlProvider>
    );
  };
}
