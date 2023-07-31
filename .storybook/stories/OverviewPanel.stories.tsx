import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import OverviewPanel from "src/pages/ProjectDetails/Overview/OverviewPanel";

export default {
  title: "OverviewPanel",
  decorators: [withContributorProfilePanelProvider],
};

export const Default = {
  render: () => (
    <OverviewPanel
      {...{
        topContributors: [
          { login: "ofux", avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4" },
          { login: "tdelabro", avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4" },
          { login: "anthonybuisset", avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4" },
        ],
        totalContributorsCount: 5,
        leads: [
          {
            id: "user-1",
            login: "anthonybuisset",
            avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
            githubUserId: 43467246,
          },
          {
            id: "user-2",
            login: "bernardstanislas",
            avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
            githubUserId: 4435377,
          },
          {
            id: "user-3",
            login: "oscarwroche",
            avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
            githubUserId: 21149076,
          },
        ],
        sponsors: [
          {
            id: 1,
            name: "Starknet",
            logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg",
            url: "https://starkware.co/starknet/",
          },
          {
            id: 2,
            name: "Ethereum Foundation",
            logoUrl: "https://logotyp.us/files/ethereum-foundation.svg",
            url: "https://ethereum.org/en/foundation/",
          },
        ],
        moreInfoLink: "https://keep-starknet-strange.github.io/madara/madara/index.html",
      }}
    />
  ),
};
