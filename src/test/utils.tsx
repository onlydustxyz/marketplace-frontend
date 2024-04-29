import { RenderOptions, render } from "@testing-library/react";

import { IntlProvider } from "hooks/translate/use-translate";

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);
