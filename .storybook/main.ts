import postcss from "postcss";
import * as tailwindcss from "../tailwind.config";

const config = {
  stories: ["../frontend/src/**/*.mdx", "../frontend/src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
          postcssOptions: {
            plugins: {
              tailwindcss,
              autoprefixer: {},
            },
          },
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
  env: config => ({
    ...config,
    VITE_FF_RESPONSIVENESS: "true",
  }),
};
export default config;
