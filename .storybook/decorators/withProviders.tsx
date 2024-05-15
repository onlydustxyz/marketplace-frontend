/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Stacks } from "src/App/Stacks/Stacks";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";

import { IntlProvider } from "hooks/translate/use-translate";

const queryClient = new QueryClient();

export default function withContextProviders() {
  return (Story: StoryFn) => {
    return (
      <IntlProvider>
        <ToasterProvider>
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
        </ToasterProvider>
      </IntlProvider>
    );
  };
}
