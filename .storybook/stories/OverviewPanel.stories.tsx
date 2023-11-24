import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import OverviewPanel from "src/pages/ProjectDetails/Overview/OverviewPanel";

export default {
  title: "OverviewPanel",
  decorators: [withContributorProfilePanelProvider],
};

export const Default = {
  render: () => (
    <OverviewPanel
      showPendingInvites={false}
      {...{
        topContributors: [
          {
            githubUserId: 74653697,
            login: "antiyro",
            htmlUrl: "https://github.com/antiyro",
            avatarUrl: "https://avatars.githubusercontent.com/u/74653697?v=4",
          },
          {
            githubUserId: 8642470,
            login: "gregcha",
            htmlUrl: "https://github.com/gregcha",
            avatarUrl: "https://avatars.githubusercontent.com/u/8642470?v=4",
          },
        ],
        totalContributorsCount: 5,
        leads: [
          {
            id: "user-1",
            login: "anthonybuisset",
            avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
            githubUserId: 43467246,
            htmlUrl: "https://github.com/onlydustxyz",
          },
          {
            id: "user-2",
            login: "bernardstanislas",
            avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
            githubUserId: 4435377,
            htmlUrl: "https://github.com/onlydustxyz",
          },
          {
            id: "user-3",
            login: "oscarwroche",
            avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
            githubUserId: 21149076,
            htmlUrl: "https://github.com/onlydustxyz",
          },
        ],
        sponsors: [
          {
            id: "user-1",
            name: "Starknet",
            logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg",
            url: "https://starkware.co/starknet/",
          },
          {
            id: "user-2",
            name: "Ethereum Foundation",
            logoUrl: "https://logotyp.us/files/ethereum-foundation.svg",
            url: "https://ethereum.org/en/foundation/",
          },
        ],
        moreInfoName: "",
        moreInfoLink: "https://keep-starknet-strange.github.io/madara/madara/index.html",
      }}
    />
  ),
};

export const WithPendingInvites = {
  render: () => (
    <OverviewPanel
      showPendingInvites
      {...{
        topContributors: [
          {
            githubUserId: 74653697,
            login: "antiyro",
            htmlUrl: "https://github.com/antiyro",
            avatarUrl: "https://avatars.githubusercontent.com/u/74653697?v=4",
          },
          {
            githubUserId: 8642470,
            login: "gregcha",
            htmlUrl: "https://github.com/gregcha",
            avatarUrl: "https://avatars.githubusercontent.com/u/8642470?v=4",
          },
        ],
        totalContributorsCount: 5,
        leads: [
          {
            id: "user-1",
            login: "anthonybuisset",
            avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
            githubUserId: 43467246,
            htmlUrl: "https://github.com/onlydustxyz",
          },
          {
            id: "user-2",
            login: "bernardstanislas",
            avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
            githubUserId: 4435377,
            htmlUrl: "https://github.com/onlydustxyz",
          },
          {
            id: "user-3",
            login: "oscarwroche",
            avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
            githubUserId: 21149076,
            htmlUrl: "https://github.com/onlydustxyz",
          },
        ],
        invitedLeads: [
          {
            id: "user-4",
            login: "alexbeno",
            avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
            githubUserId: 17259618,
            htmlUrl: "https://github.com/onlydustxyz",
          },
          {
            id: "user-5",
            login: "haydencleary",
            avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            githubUserId: 5160414,
            htmlUrl: "https://github.com/onlydustxyz",
          },
        ],
        sponsors: [
          {
            id: "user-1",
            name: "Starknet",
            logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg",
            url: "https://starkware.co/starknet/",
          },
          {
            id: "user-2",
            name: "Ethereum Foundation",
            logoUrl: "https://logotyp.us/files/ethereum-foundation.svg",
            url: "https://ethereum.org/en/foundation/",
          },
        ],
        moreInfoLink: "https://keep-starknet-strange.github.io/madara/madara/index.html",
        moreInfoName: "",
      }}
    />
  ),
};
