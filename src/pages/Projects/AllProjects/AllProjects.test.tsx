import React from "react";
import { render } from "@testing-library/react";
import AllProjects from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { ProjectFilterProvider } from "src/pages/Projects/useProjectFilter";
import { AuthProvider } from "src/hooks/useAuth";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { ToasterProvider } from "src/hooks/useToaster";

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
        <ImpersonationClaimsProvider>
          <TokenSetProvider>
            <ToasterProvider>
              <ProjectFilterProvider>
                <ApolloWrapper>
                  <AuthProvider>
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
                  </AuthProvider>
                </ApolloWrapper>
              </ProjectFilterProvider>
            </ToasterProvider>
          </TokenSetProvider>
        </ImpersonationClaimsProvider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
