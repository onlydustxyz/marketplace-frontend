import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import GithubLink from ".";
import { renderWithIntl } from "src/test/utils";

expect.extend(matchers);

const SIGN_IN_WITH_GITHUB_TEXT_QUERY = /sign in with github/i;
const GITHUB_LOGO_NAME_QUERY = /github logo/i;

describe('"GithubLink" component', () => {
  it("should display the text", () => {
    renderWithIntl(<GithubLink />);
    expect(screen.queryByText(SIGN_IN_WITH_GITHUB_TEXT_QUERY)).toBeInTheDocument();
  });

  it("should display the logo", async () => {
    renderWithIntl(<GithubLink />);
    await screen.findByRole("img", {
      name: GITHUB_LOGO_NAME_QUERY,
    });
  });
});
