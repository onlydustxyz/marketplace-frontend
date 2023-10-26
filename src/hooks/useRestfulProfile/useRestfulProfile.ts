import { useAuth } from "src/hooks/useAuth";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { components } from "src/__generated/api";
import { useRestfulMockData } from "src/hooks/useRestfulData/useRestfulMockData";

export type ProfilePublic = components["schemas"]["PublicUserProfileResponse"];
export type ProfilePrivate = components["schemas"]["GetMeResponse"];
export type Profile = ProfilePublic;

const mock = {
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  bio: "Contributing to awesome open source projects.",
  contacts: [
    {
      channel: "DISCORD",
      contact: "foobar@gmail.com",
      visibility: "private",
    },
  ],
  cover: "BLUE",
  createdAt: "2023-10-26T08:09:21.931Z",
  firstContributedAt: "2023-10-26T08:09:21.931Z",
  githubUserId: 595505,
  htmlUrl: "string",
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  lastSeenAt: "2023-10-26T08:09:21.931Z",
  location: "Paris, France",
  login: "ofux",
  projects: [
    {
      contributorCount: 163,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isLead: false,
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/2529199823275297272.jpg",
      name: "Verkle Tries",
      slug: "string",
      totalGranted: 25400,
      userContributionCount: 34,
      userLastContributedAt: "2023-10-26T08:09:21.931Z",
    },
  ],
  stats: {
    contributedProjectCount: 2,
    contributionCount: 104,
    contributionCountPerWeeks: [
      {
        codeReviewCount: 0,
        issueCount: 0,
        pullRequestCount: 0,
        week: 34,
        year: 2023,
      },
    ],
    contributionCountVariationSinceLastWeek: 0,
    leadedProjectCount: 1,
    totalsEarned: {
      details: [
        {
          currency: "OP",
          totalAmount: 0,
          totalDollarsEquivalent: 0,
        },
        {
          currency: "ETH",
          totalAmount: 0,
          totalDollarsEquivalent: 0,
        },
        {
          currency: "APT",
          totalAmount: 0,
          totalDollarsEquivalent: 0,
        },
      ],
      totalAmount: 0,
    },
  },
  technologies: { Rust: 91283, Go: 12388, Java: 1233 },
  website: "string",
};

export default function useRestfulProfile({
  githubUserLogin,
  githubUserId,
}: {
  githubUserLogin?: string;
  githubUserId?: number;
}) {
  const { user: currentUser, githubUserId: currentUserGithubId } = useAuth();

  const { data, isLoading, isError } = useRestfulMockData({
    resourcePath: ApiResourcePaths.GET_PUBLIC_USER_PROFILE,
    pathParam: `${githubUserId}`,
    method: "GET",
    mock,
  });

  return {
    data: data as Profile,
    loading: isLoading,
  };
}
