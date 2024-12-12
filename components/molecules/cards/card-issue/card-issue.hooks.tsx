import { formatDistanceToNowStrict } from "date-fns";
import { ReactNode } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { CardIssuePort } from "components/molecules/cards/card-issue/card-issue.types";

type GetActionsProps = Pick<
  CardIssuePort<"div">,
  "applyActionProps" | "viewActionProps" | "assignedActionProps" | "status" | "assignee" | "githubUsername"
> & {
  hasApplied: boolean;
};
type GetActionsReturn = ReactNode;

const useAction = ({
  applyActionProps,
  viewActionProps,
  assignedActionProps,
  status = "open",
  assignee,
  githubUsername,
  hasApplied,
}: GetActionsProps): GetActionsReturn => {
  if (hasApplied) {
    return <Button {...viewActionProps} />;
  }

  if (status === "open") {
    return <Button {...applyActionProps} />;
  }

  if (status === "applied") {
    return <Button {...viewActionProps} />;
  }

  if (status === "assigned") {
    if (assignee?.name === githubUsername) {
      return <Button {...viewActionProps} />;
    }

    return <Button isDisabled {...assignedActionProps} />;
  }

  return null;
};

const useCreatedAt = ({ createdAt }: Pick<CardIssuePort<"div">, "createdAt">): string | null => {
  if (createdAt) {
    return formatDistanceToNowStrict(createdAt, { addSuffix: true });
  }

  return null;
};

export const useCardIssue = {
  useAction,
  useCreatedAt,
};
