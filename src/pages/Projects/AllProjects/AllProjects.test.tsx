import React from "react";
import { render } from "@testing-library/react";
import AllProjects from "."; // Adjust the import to your file structure
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { ProjectFilterProvider } from "src/pages/Projects/useProjectFilter";

// Create a client
const queryClient = new QueryClient();

jest.mock("src/pages/Projects/useProjectFilter", () => ({
  useProjectFilter: () => ({
    projectFilter: { ownership: "", technologies: [], sponsors: [] },
    clear: jest.fn(),
  }),
}));

jest.mock("src/hooks/useRestfulData", () => ({
  useRestfulData: () => ({
    data: {
      projects: [],
      technologies: [],
      sponsors: [],
    },
    isLoading: false,
    isError: false,
  }),
}));

describe("<AllProjects />", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <TokenSetProvider>
          <ProjectFilterProvider>
            <QueryClientProvider client={queryClient}>
              <AllProjects
                search=""
                clearSearch={jest.fn()}
                sorting={undefined}
                setSorting={jest.fn()}
                restoreScroll={jest.fn()}
                filterPanelOpen={false}
                setFilterPanelOpen={jest.fn()}
                sortingPanelOpen={false}
                setSortingPanelOpen={jest.fn()}
                setTechnologies={jest.fn()}
                setSponsors={jest.fn()}
              />
            </QueryClientProvider>
          </ProjectFilterProvider>
        </TokenSetProvider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
