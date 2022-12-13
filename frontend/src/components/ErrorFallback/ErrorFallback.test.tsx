import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import ErrorFallback from ".";
import { renderWithIntl } from "src/test/utils";

expect.extend(matchers);

describe('"ErrorFallback" component', () => {
  renderWithIntl(<ErrorFallback />);

  it("should display the logo", () => {
    expect(screen.queryByText("Try to refresh the page")).toBeInTheDocument();
  });
});
