import { useEffect, useState } from "react";
import { getPaymentStatusOrder, Payment } from "src/types";

export enum Field {
  Date,
  Contribution,
  Amount,
  Status,
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

const ISSUE_NUMBER = /pull\/(\d+)$/;

export default function usePaymentSorting<T extends Payment>(
  payments: T[]
): { sortedPayments: T[]; sorting: { field: Field; ascending: boolean }; applySorting: (field: Field) => void } {
  const [sorting, setSorting] = useState({ field: Field.Date, ascending: false });
  const [sortedPayments, setSortedPayments] = useState(payments);

  useEffect(() => {
    const sorted = [...payments].sort((p1, p2) => {
      switch (sorting.field) {
        case Field.Date: {
          const requestedAt1 = new Date(p1.requestedAt);
          const requestedAt2 = new Date(p2.requestedAt);
          return requestedAt1.getTime() - requestedAt2.getTime();
        }
        case Field.Contribution: {
          const issueNumber1 = p1.reason.match(ISSUE_NUMBER) || ["", ""];
          const issueNumber2 = p2.reason.match(ISSUE_NUMBER) || ["", ""];
          return p1.recipient && p2.recipient
            ? `${p1.recipient.login}${issueNumber1[1]}`.localeCompare(`${p2.recipient.login}${issueNumber2[1]}`)
            : p1.project && p2.project
            ? `${p1.project.title}${issueNumber1[1]}`.localeCompare(`${p2.project.title}${issueNumber2[1]}`)
            : 1;
        }
        case Field.Amount:
          return p1.amount.value - p2.amount.value;
        case Field.Status:
          return getPaymentStatusOrder(p1.status) - getPaymentStatusOrder(p2.status);
      }
    });
    setSortedPayments(sorting.ascending ? sorted : sorted.reverse());
  }, [sorting, payments]);

  const applySorting = (field: Field) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : true });

  return { sortedPayments, sorting, applySorting };
}
