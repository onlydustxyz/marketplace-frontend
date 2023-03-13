import { Status } from "src/__generated/graphql";
import GithubIssue, { Action, Props } from ".";

const issues = {
  closed: {
    id: 1268051991,
    number: 541,
    status: Status.Closed,
    title: "Disable RPC json validation in devnet",
    createdAt: "2023-03-08T15:31:51+00:00",
    closedAt: "2023-03-09T18:42:24+00:00",
    mergedAt: null,
  },
  open: {
    id: 1268051991,
    number: 541,
    status: Status.Open,
    title: "Disable RPC json validation in devnet",
    createdAt: "2023-03-08T15:31:51+00:00",
    closedAt: "2023-03-09T18:42:24+00:00",
    mergedAt: null,
  },
  merged: {
    id: 1268051991,
    number: 541,
    status: Status.Merged,
    title: "Disable RPC json validation in devnet",
    createdAt: "2023-03-08T15:31:51+00:00",
    closedAt: "2023-03-09T18:42:24+00:00",
    mergedAt: "2023-03-09T18:42:24+00:00",
  },
};

export default {
  title: "GithubIssue",
  component: GithubIssue,
  argTypes: {
    action: {
      control: { type: "select" },
      options: [undefined, Action.Add, Action.Remove],
    },
    issue: {
      options: Object.keys(issues),
      mapping: issues,
      control: {
        type: "select",
        labels: {
          closed: "closed",
          open: "open",
        },
      },
    },
  },
};

const props: Props = {
  repository: {
    id: 545531678,
    owner: "sayajin-labs",
    name: "kakarot",
  },
  issue: issues.closed,
};

export const Default = {
  render: (args: Props) => <GithubIssue {...props} {...args} />,
};
