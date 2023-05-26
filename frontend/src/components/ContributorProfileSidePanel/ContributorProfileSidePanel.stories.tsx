import { GithubUserFragment } from "src/__generated/graphql";
import ContributorProfileSidePanel from "./View";

export default {
  title: "ContributorProfileSidePanel",
  component: ContributorProfileSidePanel,
};

const user: GithubUserFragment = {
  __typename: "GithubUsers",
  login: "AnthonyBuisset",
  id: 43467246,
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  htmlUrl: "https://github.com/AnthonyBuisset",
  user: null,
};

export const Default = {
  render: () => (
    <ContributorProfileSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
      {...user}
    />
  ),
};
