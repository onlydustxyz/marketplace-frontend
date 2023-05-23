import OverviewPanel from ".";

export default {
  title: "OverviewPanel",
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
          },
          {
            id: "user-2",
            login: "bernardstanislas",
            avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
          },
          {
            id: "user-3",
            login: "oscarwroche",
            avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
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
        totalSpentAmountInUsd: 135642,
        totalInitialAmountInUsd: 300000,
        telegramLink: "https://keep-starknet-strange.github.io/madara/madara/index.html",
      }}
    />
  ),
};
