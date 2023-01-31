import "tailwindcss/tailwind.css";
import "src/assets/css/index.css";
import "remixicon/fonts/remixicon.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import "src/assets/fonts/BelweBdBt/stylesheet.css";
import { IntlProvider } from "src/hooks/useIntl";
import React from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "black",
    values: [
      {
        name: "black",
        value: "#000000",
      },
      {
        name: "space",
        value: "url(https://cdn.jsdelivr.net/gh/onlydustxyz/marketplace@2.0/frontend/src/assets/img/bg-space.png)",
      },
    ],
  },
};

export const decorators = [
  Story => (
    <IntlProvider>
      <Story />
    </IntlProvider>
  ),
];
