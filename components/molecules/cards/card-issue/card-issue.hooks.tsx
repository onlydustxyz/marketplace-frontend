import { formatDistanceToNowStrict } from "date-fns";
import { ReactNode } from "react";

import { Avatar } from "components/atoms/avatar";
import { ButtonPort } from "components/atoms/button/button.types";
import { Button } from "components/atoms/button/variants/button-default";
import { CardIssuePort } from "components/molecules/cards/card-issue/card-issue.types";

type GetActionsProps = Pick<
  CardIssuePort<"div">,
  "applyActionProps" | "viewActionProps" | "status" | "githubLink" | "assignee" | "tokens"
>;
type GetActionsReturn = ReactNode[];

const useGithubLinkComponent = ({ githubLink, tokens }: Pick<CardIssuePort<"div">, "githubLink" | "tokens">) => {
  if (githubLink) {
    return (
      <Button
        size={"s"}
        as="a"
        variant="secondary-light"
        htmlProps={{ href: githubLink, target: "_blank" }}
        startIcon={{ remixName: "ri-github-line" }}
      >
        {tokens.githubLink}
      </Button>
    );
  }

  return null;
};

const useAssigneeComponent = ({ assignee }: Pick<CardIssuePort<"div">, "assignee">) => {
  if (assignee) {
    const defaultProps: Partial<ButtonPort<"button">> = {
      startContent: <Avatar shape={"square"} size={"xs"} {...assignee.avatar} />,
      children: assignee.name,
    };

    if (assignee.href) {
      return (
        <Button size={"s"} variant="secondary-light" {...defaultProps} as="a" htmlProps={{ href: assignee.href }} />
      );
    }

    if (assignee.onClick) {
      return <Button size={"s"} variant="secondary-light" {...defaultProps} onClick={assignee.onClick} />;
    }

    return <Button size={"s"} variant="secondary-light" {...defaultProps} />;
  }

  return null;
};

const usePrimaryActionComponent = ({
  applyActionProps,
  viewActionProps,
  status,
}: Pick<CardIssuePort<"div">, "applyActionProps" | "viewActionProps" | "status">) => {
  if (status === "open") {
    return <Button size={"s"} {...applyActionProps} />;
  }

  if (status === "applied") {
    return <Button size={"s"} {...viewActionProps} />;
  }

  return null;
};

const useActions = ({
  applyActionProps,
  viewActionProps,
  status = "open",
  githubLink,
  tokens,
  assignee,
}: GetActionsProps): GetActionsReturn => {
  const githubLinkComponent = useGithubLinkComponent({ githubLink, tokens });
  const assigneeComponent = useAssigneeComponent({ assignee });
  const primaryActionComponent = usePrimaryActionComponent({ applyActionProps, viewActionProps, status });

  if (status === "open") {
    return [githubLinkComponent, primaryActionComponent];
  }

  if (status === "applied") {
    return [githubLinkComponent, primaryActionComponent];
  }

  if (status === "assigned") {
    return [assigneeComponent, githubLinkComponent];
  }

  return [];
};

const useCreatedAt = ({ createdAt }: Pick<CardIssuePort<"div">, "createdAt">): string | null => {
  if (createdAt) {
    return formatDistanceToNowStrict(createdAt, { addSuffix: true });
  }

  return null;
};

const useCreatedBy = ({ createdBy }: Pick<CardIssuePort<"div">, "createdBy">): ReactNode => {
  if (createdBy) {
    return (
      <div className={"flex flex-row items-center justify-start"}>
        <Avatar {...createdBy.avatar} />
        <span>{createdBy.name}</span>
      </div>
    );
  }

  return null;
};

export const useCardIssue = {
  useAssigneeComponent,
  usePrimaryActionComponent,
  useGithubLinkComponent,
  useActions,
  useCreatedAt,
  useCreatedBy,
};
