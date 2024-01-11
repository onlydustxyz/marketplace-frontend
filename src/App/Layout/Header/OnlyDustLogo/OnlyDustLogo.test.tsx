import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import OnlyDustLogo from ".";
import { renderWithIntl } from "src/test/utils";

expect.extend(matchers);

const ONLYDUST_LOGO_NAME_QUERY = /onlydust logo/i;

describe('"OnlyDustLogo" component', () => {
  renderWithIntl(<OnlyDustLogo />);

  const image = screen.getByRole("img", {
    name: ONLYDUST_LOGO_NAME_QUERY,
  });

  it("should display the logo", () => {
    expect(image).toBeInTheDocument();
  });
});
