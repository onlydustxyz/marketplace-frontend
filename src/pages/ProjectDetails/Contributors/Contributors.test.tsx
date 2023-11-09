import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "src/hooks/useAuth";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { ToasterProvider } from "src/hooks/useToaster";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import View from "src/pages/ProjectDetails/View";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { renderWithIntl } from "src/test/utils";

const project: ComponentProps<typeof View>["project"] = {
  id: "test-project-id",
  slug: "performance-test-with-a-very-long-name",
  name: "Performance test with a very long name",
  shortDescription: "Do not create issue on this one as it is linked with real projects !",
  longDescription: "Do not create issue on this one as it is linked with real projects !",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/1409408835957028656.png",
  hiring: false,
  visibility: "PUBLIC",
  contributorCount: 3,
  moreInfoUrl: "www.onlydust.xyz",
  leaders: [
    {
      githubUserId: 498695724,
      login: "AnthonyBuisset",
      htmlUrl: "",
      avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
      id: "adcb11a6-92cf-4a1e-bace-79f7bdbc54e7",
    },
    {
      githubUserId: 498695724,
      login: "ofux",
      htmlUrl: "",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      id: "bd365490-dd23-4a24-ad23-7853fbd853c2",
    },
  ],
  repos: [
    {
      id: 566371874,
      owner: "onlydustxyz",
      name: "hasura-auth",
      description: "Authentication for Hasura.",
      stars: 0,
      forkCount: 1,
      htmlUrl: "https://github.com/onlydustxyz/hasura-auth",
      hasIssues: false,
    },
    {
      id: 498695724,
      owner: "onlydustxyz",
      name: "marketplace-frontend",
      description: "Contributions marketplace backend services",
      stars: 15,
      forkCount: 10,
      htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
      hasIssues: true,
    },
  ],
  topContributors: [
    {
      githubUserId: 698957,
      login: "ltoussaint",
      htmlUrl: "https://github.com/ltoussaint",
      avatarUrl: "https://avatars.githubusercontent.com/u/698957?v=4",
    },
    {
      githubUserId: 595505,
      login: "ofux",
      htmlUrl: "https://github.com/ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
    {
      githubUserId: 4435377,
      login: "Bernardstanislas",
      htmlUrl: "https://github.com/Bernardstanislas",
      avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
    },
  ],
  sponsors: [
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983041",
      name: "OnlyDust",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983042",
      name: "OnlyFast",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983043",
      name: "OnlyRust",
      url: "",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
  ],
  technologies: {
    Java: 1082,
    CPlusPlus: 22688656,
    CSS: 128024,
    C: 3655312,
    Scheme: 50648,
    CMake: 115552,
    ObjectiveCPlusPlus: 10994,
    QMake: 876,
    Makefile: 298032,
    M4: 435994,
    HTML: 285238,
    Sage: 118798,
    TypeScript: 42942,
    Dockerfile: 9068,
    Shell: 367042,
    CoffeeScript: 34960,
    CapnProto: 2512,
    JavaScript: 8236948,
    Assembly: 56732,
    Python: 6840986,
  },
  remainingUsdBudget: 99250.0,
  invitedLeaders: [],
  createdAt: "",
};

const queryClient = new QueryClient();

describe("Contributors page", () => {
  it("renders Contributors component", async () => {
    renderWithIntl(
      <MemoryRouter>
        <ImpersonationClaimsProvider>
          <ToasterProvider>
            <TokenSetProvider>
              <ApolloWrapper>
                <AuthProvider>
                  <QueryClientProvider client={queryClient}>
                    <View project={project} loading={false} error={null} />
                  </QueryClientProvider>
                </AuthProvider>
              </ApolloWrapper>
            </TokenSetProvider>
          </ToasterProvider>
        </ImpersonationClaimsProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.findByText("Contributors"));
    });
  });
});
