import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import GithubLogo from ".";
import { renderWithIntl } from "src/test/utils";

expect.extend(matchers);

const GITHUB_LOGO_NAME_QUERY = /github logo/i;

describe('"GithubLogo" component', () => {
  renderWithIntl(<GithubLogo />);

  const image = screen.getByRole("img", {
    name: GITHUB_LOGO_NAME_QUERY,
  });

  it("should display the logo", () => {
    expect(image).toBeInTheDocument();
  });
});
