import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["./**/*.mdx", "../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages.
      propFilter: prop => {
        return prop.parent
          ? !/node_modules\/(?!tailwind-variants|@nextui-org|@react-types|react)/.test(prop.parent.fileName) &&
              !/components\/(?!atoms|molecules|organisms|types)/.test(prop.parent.fileName)
          : true;
      },
    },
  },
};
export default config;
