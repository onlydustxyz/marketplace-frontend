import { StoryFn } from "@storybook/react";

import { IntlProvider } from "hooks/translate/use-translate";

export default function withProviders() {
  return (Story: StoryFn) => {
    return (
      <IntlProvider>
        <Story />
      </IntlProvider>
    );
  };
}
