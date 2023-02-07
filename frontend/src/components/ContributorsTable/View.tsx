import Table from "../Table";
import { rates } from "src/hooks/useWorkEstimation";
import { useMemo, useState } from "react";
import { sortBy } from "lodash";
import Headers from "./Headers";
import ContributorLine from "./Line";

export type Contributor = {
  login: string;
  avatarUrl: string;
  isRegistered: boolean;
  totalEarned: number;
  paidContributions: number;
};

export enum Field {
  Login = "login",
  TotalEarned = "totalEarned",
  PaidContributions = "paidContributions",
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

  const [sorting, setSorting] = useState({ field: Field.PaidContributions, ascending: false });

  const applySorting = (field: Field) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : true });

  const sortedContributors = useMemo(() => {
    const sorted = sortBy([...contributors], contributor => {
      const f = contributor[sorting.field];
      return typeof f === "string" ? f.toLocaleLowerCase() : f;
    });
    return sorting.ascending ? sorted : sorted.reverse();
  }, [sorting]);

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
