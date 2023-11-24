import { renderHook } from "@testing-library/react-hooks";
import { describe, it } from "vitest";
import {
  OwnUserProfileDetailsFragment,
  OwnUserProfileDocument,
  OwnUserProfileQueryResult,
  UserProfileFragment,
  useOwnUserProfileQuery,
} from "src/__generated/graphql";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import useApolloCache from "src/providers/ApolloWrapper/cache";
import { waitFor } from "@testing-library/react";

const GITHUB_USER_ID = 43467246;

type ProfileFragment = UserProfileFragment & OwnUserProfileDetailsFragment;

const EMPTY_PROFILE: ProfileFragment = {
  __typename: "UserProfiles",
  avatarUrl: null,
  bio: null,
  completionScore: 0,
  contactInformations: [{ channel: "email", contact: "antho@mail.com", public: false }],
  contacts: {
    email: { contact: null, public: null },
    discord: null,
    linkedin: null,
    telegram: null,
    twitter: null,
    whatsapp: null,
  },
  contributionCounts: [],
  contributionStats: [],
  contributionStatsAggregate: { aggregate: null },
  cover: null,
  createdAt: null,
  githubUserId: GITHUB_USER_ID,
  htmlUrl: null,
  languages: {},
  lastSeen: null,
  location: null,
  login: "login",
  lookingForAJob: null,
  paymentStats: [],
  paymentStatsAggregate: { aggregate: null },
  projectsContributed: [],
  projectsContributedAggregate: { aggregate: null },
  projectsLeaded: [],
  website: null,
  weeklyAllocatedTime: null,
};

const mockProfile = (profile: Partial<ProfileFragment>): MockedResponse => ({
  request: {
    query: OwnUserProfileDocument,
    variables: { githubUserId: GITHUB_USER_ID },
  },
  result: {
    data: {
      userProfiles: [
        {
          ...EMPTY_PROFILE,
          ...profile,
        },
      ],
    } as OwnUserProfileQueryResult["data"],
  },
});

// TODO remove this test ?
const renderOwnUserProfileQuery = (profile: Partial<ProfileFragment> = {}) => {
  const { result: cacheResult } = renderHook(() => useApolloCache());

  const { result } = renderHook(() => useOwnUserProfileQuery({ variables: { githubUserId: GITHUB_USER_ID } }), {
    wrapper: MockedProvider,
    initialProps: { mocks: [mockProfile(profile)], cache: cacheResult.current, addTypename: true },
  });

  return result;
};

describe("useUserProfile", () => {
  it("should compute the contacts", async () => {
    const result = renderOwnUserProfileQuery({
      contactInformations: [
        { channel: "email", contact: "antho@mail.com", public: true },
        { channel: "telegram", contact: "antho", public: true },
        { channel: "twitter", contact: "@antho", public: true },
        { channel: "discord", contact: "antho#123", public: true },
        { channel: "linkedin", contact: "antho.b", public: true },
        { channel: "whatsapp", contact: "+33612345678", public: true },
      ],
    });

    await waitFor(() => {
      expect(result.current.data?.userProfiles.at(0)?.contacts.email?.contact).toBe("antho@mail.com");
      expect(result.current.data?.userProfiles.at(0)?.contacts.telegram?.contact).toBe("antho");
      expect(result.current.data?.userProfiles.at(0)?.contacts.twitter?.contact).toBe("@antho");
      expect(result.current.data?.userProfiles.at(0)?.contacts.discord?.contact).toBe("antho#123");
      expect(result.current.data?.userProfiles.at(0)?.contacts.linkedin?.contact).toBe("antho.b");
      expect(result.current.data?.userProfiles.at(0)?.contacts.whatsapp?.contact).toBe("+33612345678");
    });
  });

  it("should compute the completion score for an empty profile", async () => {
    const result = renderOwnUserProfileQuery();
    await waitFor(() => expect(result.current.data?.userProfiles.at(0)?.completionScore).toBe(20));
  });

  it("should compute the completion score for a fully filled profile", async () => {
    const result = renderOwnUserProfileQuery({
      avatarUrl: "link_to_avatar",
      bio: "My bio",
      location: "location",
      website: "website",
      contactInformations: [
        { channel: "email", contact: "antho@mail.com", public: true },
        { channel: "telegram", contact: "antho", public: true },
        { channel: "twitter", contact: "@antho", public: true },
        { channel: "discord", contact: "antho#123", public: true },
        { channel: "linkedin", contact: "antho.b", public: true },
        { channel: "whatsapp", contact: "+33612345678", public: true },
      ],
      languages: { Rust: 123 },
      weeklyAllocatedTime: "none",
    });

    await waitFor(() => expect(result.current.data?.userProfiles.at(0)?.completionScore).toBe(100));
  });
});
