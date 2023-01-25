import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import OnlyDustLogo from ".";
import { renderWithIntl } from "src/test/utils";
import { BrowserRouter } from "react-router-dom";

expect.extend(matchers);

const ONLYDUST_LOGO_NAME_QUERY = /onlydust logo/i;

describe('"OnlyDustLogo" component', () => {
  renderWithIntl(<OnlyDustLogo />, { wrapper: BrowserRouter });

  const image = screen.getByRole("img", {
    name: ONLYDUST_LOGO_NAME_QUERY,
  });

  it("should display the logo", () => {
    expect(image).toBeInTheDocument();
  });
});
