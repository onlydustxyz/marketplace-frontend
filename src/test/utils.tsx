import { RenderOptions, render } from "@testing-library/react";

import { IntlProvider } from "src/hooks/useIntl";

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);
