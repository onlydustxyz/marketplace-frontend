
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contributors from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { AuthProvider } from "src/hooks/useAuth";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { ToasterProvider } from "src/hooks/useToaster";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { useOutletContext } from "react-router-dom";

const project = {
  id: "cdb45d97-13a6-4f71-8c8c-78917fc02649",
  slug: "performance-test-with-a-very-long-name",
  name: "Performance test with a very long name",
  shortDescription: "Do not create issue on this one as it is linked with real projects !",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/1409408835957028656.png",
  hiring: false,
  visibility: "PUBLIC",
  repoCount: 2,
  contributorCount: 3,
  moreInfoUrl: "www.onlydust.xyz",
  leaders: [
    {
      githubUserId: 74653697,
      login: "AnthonyBuisset",
      htmlUrl: null,
      avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
      id: "adcb11a6-92cf-4a1e-bace-79f7bdbc54e7",
    },
    {
      githubUserId: 8642470,
      login: "ofux",
      htmlUrl: null,
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
      url: null,
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983042",
      name: "OnlyFast",
      url: null,
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
    },
    {
      id: "ce038af0-9f8d-4948-bd5a-1c86cf983043",
      name: "OnlyRust",
      url: null,
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
  isInvitedAsProjectLead: false,
  remainingUsdBudget: 99250.0,
};

// Create a client
const queryClient = new QueryClient();



test("renders Contributors component", () => {
  render(
    <MemoryRouter>
      <ImpersonationClaimsProvider>
        <ToasterProvider>
          <TokenSetProvider>
            <ApolloWrapper>
              <AuthProvider>
                <QueryClientProvider client={queryClient}>
                  <Contributors />
                </QueryClientProvider>
              </AuthProvider>
            </ApolloWrapper>
          </TokenSetProvider>
        </ToasterProvider>
      </ImpersonationClaimsProvider>
    </MemoryRouter>
  );

  // Assuming "Contributors" is a text that should appear in your component
  const linkElement = screen.getByText(/Contributors/i);
  expect(linkElement).toBeInTheDocument();
});
