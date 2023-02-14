import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import FilterPanel, { GET_ALL_TECHNOLOGIES_QUERY } from ".";
import { renderWithIntl, MemoryRouterProviderFactory } from "src/test/utils";
import { ProjectOwnershipType } from "..";

expect.extend(matchers);

const graphQlMocks = [
  {
    request: {
      query: GET_ALL_TECHNOLOGIES_QUERY,
    },
    result: {
      data: {
        projects: [
          { githubRepo: { languages: { "C++": 1234, Shell: 123, Makefile: 10 } } }, // 3 languages
          { githubRepo: { languages: { Rust: 1234, Shell: 123 } } }, // 2 languages with one same as above
          { githubRepo: { languages: { TypeScript: 1234 } } }, // 1 languages
          { githubRepo: { languages: {} } }, // No language
          { githubRepo: null }, // No repo
        ],
      },
    },
  },
];

describe("FilterPanel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should should display first 2 technologies of projects and be sorted", async () => {
    renderWithIntl(
      <FilterPanel
        projectOwnershipType={ProjectOwnershipType.All}
        setProjectOwnershipType={() => {
          return;
        }}
        isProjectLeader={false}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );

    userEvent.click(await screen.findByRole("button"));

    const allOptions = await screen.findAllByRole("option");
    expect(allOptions.length).toBe(4);
    expect(allOptions[0]).toHaveTextContent("C++");
    expect(allOptions[1]).toHaveTextContent("Rust");
    expect(allOptions[2]).toHaveTextContent("Shell");
    expect(allOptions[3]).toHaveTextContent("TypeScript");
  });
});
