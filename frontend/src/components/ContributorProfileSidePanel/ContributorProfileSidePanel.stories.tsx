import { UserProfileFragment } from "src/__generated/graphql";
import ContributorProfileSidePanel from "./View";

export default {
  title: "ContributorProfileSidePanel",
  component: ContributorProfileSidePanel,
};

const profile: UserProfileFragment = {
  __typename: "UserProfiles",
  githubUserId: 43467246,
  login: "AnthonyBuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  htmlUrl: "https://github.com/AnthonyBuisset",
  location: "Nice, France",
  bio: "Anthony Buisset est né le 17 décembre 1991 au Mans. Il commence la pétanque à l'âge de trois ans. Il pratique d'abord ce sport au sein de sa famille, avec son grand-père et son père.",
  createdAt: "2023-05-10T08:46:57.965219+00:00",
  firstContributedAt: "2023-04-02T18:40:01.965219+00:00",
  lastSeen: "2023-05-20T10:10:10.965219+00:00",
  email: "anthony@foobar.org",
  twitter: "https://twitter.com/antho",
  telegram: "https://telegram.me/antho",
  linkedin: "https://linkedin.com/antho",
  discord: "ANTHO123",
  website: "https://antho-petanque.com",
  totalContributionCount: 2345,
  totalMoneyGranted: 330000,
};

export const Default = {
  render: () => (
    <ContributorProfileSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
      profile={profile}
    />
  ),
};
