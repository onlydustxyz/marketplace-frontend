import Table from "src/components/Table";
import { rates } from "src/hooks/useWorkEstimation";
import { useMemo, useState } from "react";
import { sortBy } from "lodash";
import Headers from "./Headers";
import ContributorLine from "./Line";

export type Contributor = {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  isRegistered: boolean;
  totalEarned: number;
  paidContributions: number;
  unpaidMergedPullsCount?: number;
};

export enum Field {
  Login = "login",
  TotalEarned = "totalEarned",
  PaidContributions = "paidContributions",
  LeftToPay = "unpaidMergedPullsCount",
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

type Props = {
  contributors: Contributor[];
  isProjectLeader: boolean;
  remainingBudget: number;
  onPaymentRequested: (contributor: Contributor) => void;
};

export default function View({ contributors, isProjectLeader, remainingBudget, onPaymentRequested }: Props) {
  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  const [sorting, setSorting] = useState({
    field: isProjectLeader ? Field.LeftToPay : Field.PaidContributions,
    ascending: false,
  });

  const applySorting = (field: Field, ascending: boolean) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : ascending });

  const sortedContributors = useMemo(() => {
    const sorted = sortBy([...contributors], contributor => {
      const f = contributor[sorting.field] || 0;
      return typeof f === "string" ? f.toLocaleLowerCase() : f;
    });
    return sorting.ascending ? sorted : sorted.reverse();
  }, [sorting, contributors]);

  return (
    <Table id="contributors_table" headers={<Headers {...{ sorting, applySorting, isProjectLeader }} />}>
      {sortedContributors.map(contributor => (
        <ContributorLine
          key={contributor.login}
          {...{ contributor, isProjectLeader, isSendingNewPaymentDisabled, onPaymentRequested }}
        />
      ))}
    </Table>
  );
}
