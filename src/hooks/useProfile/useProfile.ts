import { useAuth } from "src/hooks/useAuth";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { components } from "src/__generated/api";
import { useRestfulMockData } from "src/hooks/useRestfulData/useRestfulMockData";

export type ProfilePublic = components["schemas"]["PublicUserProfileResponse"];
export type ProfilePrivate = components["schemas"]["GetMeResponse"];
export type Profile = ProfilePublic;

const mock = {
  githubUserId: 595505,
  login: "ofux",
  htmlUrl: "string",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  location: "Paris, France",
  bio: "Contributing to awesome open source projects.",
  website: "string",
  technologies: {
    Rust: 91283,
    Go: 12388,
    Java: 1233,
  },
  createdAt: "2023-10-25T13:08:06.829Z",
  lastSeenAt: "2023-10-25T13:08:06.829Z",
  cover: "MAGENTA",
  contacts: [
    {
      channel: "EMAIL",
      contact: "foobar@gmail.com",
      visibility: "public",
    },
  ],
  projects: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Verkle Tries",
      isLead: false,
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/2529199823275297272.jpg",
      contributorCount: 163,
      totalGranted: 25400,
      userContributionCount: 34,
      userLastContributedAt: "2023-10-25T13:08:06.830Z",
    },
  ],
  stats: {
    contributedProjectCount: 2,
    leadedProjectCount: 1,
    totalsEarned: {
      totalAmount: 0,
      details: [
        {
          totalAmount: 0,
          totalDollarsEquivalent: 0,
          currency: "USD",
        },
      ],
    },
    contributionCount: 104,
    contributionCountPerWeeks: [
      {
        year: 2023,
        week: 34,
        codeReviewCount: 0,
        issueCount: 0,
        pullRequestCount: 0,
      },
    ],
  },
};

export default function useProfile({
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
