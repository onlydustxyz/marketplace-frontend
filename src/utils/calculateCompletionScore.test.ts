import { calculateCompletionScore } from "./calculateCompletionScore";

describe("calculateCompletionScore", () => {
  it("should return the correct completion score", () => {
    const userProfile = {
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      bio: "Contributing to awesome open source projects.",
      contacts: [
        {
          channel: "DISCORD" as const,
          contact: "foobar@gmail.com",
          visibility: "private" as const,
        },
      ],
      cover: "BLUE" as const,
      createdAt: "2023-11-23T21:07:49.749Z",
      firstContributedAt: "2023-11-23T21:07:49.749Z",
      githubUserId: 595505,
      htmlUrl: "string",
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastSeenAt: "2023-11-23T21:07:49.749Z",
      location: "Paris, France",
      login: "ofux",
      projects: [
        {
          contributorCount: 163,
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          isLead: false,
          leadSince: "2023-11-23T21:07:49.749Z",
          logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/2529199823275297272.jpg",
          name: "Verkle Tries",
          slug: "string",
          totalGranted: 25400,
          userContributionCount: 34,
          userLastContributedAt: "2023-11-23T21:07:49.749Z",
          visibility: "PRIVATE" as const,
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
              currency: "APT" as const,
              totalAmount: 0,
              totalDollarsEquivalent: 0,
            },
          ],
          totalAmount: 0,
        },
      },
      technologies: { Rust: 91283, Go: 12388, Java: 1233 },
      website: "string",
      allocatedTimeToContribute: "GREATER_THAN_THREE_DAYS" as const,
      isLookingForAJob: false,
    };

    const completionScore = calculateCompletionScore(userProfile);

    // Calculate the expected score based on the provided userProfile
    const expectedScore =
      5 + // avatarUrl exists
      15 + // login exists
      10 + // location exists
      20 + // bio exists
      10 + // website exists
      0 + // EMAIL contact does not exist
      0 + // TELEGRAM contact does not exist
      0 + // WHATSAPP contact does not exist
      0 + // TWITTER contact does not exist
      5 + // DISCORD contact exists
      0 + // LINKEDIN contact does not exist
      10; // technologies exist

    expect(completionScore).toEqual(expectedScore);
  });
});
