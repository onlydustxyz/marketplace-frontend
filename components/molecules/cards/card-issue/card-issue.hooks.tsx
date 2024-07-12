import { ReactNode } from "react";

import { Avatar } from "components/atoms/avatar";
import { ButtonPort } from "components/atoms/button/button.types";
import { Button } from "components/atoms/button/variants/button-default";
import { CardIssuePort } from "components/molecules/cards/card-issue/card-issue.types";

type GetActionsProps = Pick<
  CardIssuePort<"div">,
  "applyActionProps" | "viewActionProps" | "state" | "githubLink" | "assignee"
>;
type GetActionsReturn = ReactNode[];

const useGithubLinkComponent = ({ githubLink }: Pick<CardIssuePort<"div">, "githubLink">) => {
  if (githubLink) {
    return (
      <Button as="a" htmlProps={{ href: githubLink.href, target: "_blank" }}>
        {githubLink.label}
      </Button>
    );
  }

  return null;
};

const useAssigneeComponent = ({ assignee }: Pick<CardIssuePort<"div">, "assignee">) => {
  if (assignee) {
    const defaultProps: Partial<ButtonPort<"button">> = {
      startContent: <Avatar {...assignee.avatar} />,
      children: assignee.name,
    };

    if (assignee.href) {
      return <Button {...defaultProps} as="a" htmlProps={{ href: assignee.href }} />;
    }

    if (assignee.onClick) {
      return <Button {...defaultProps} onClick={assignee.onClick} />;
    }

    return <Button {...defaultProps} />;
  }

  return null;
};

const usePrimaryActionComponent = ({
  applyActionProps,
  viewActionProps,
  state,
}: Pick<CardIssuePort<"div">, "applyActionProps" | "viewActionProps" | "state">) => {
  if (state === "open") {
    return <Button {...applyActionProps} />;
  }

  if (state === "applied") {
    return <Button {...viewActionProps} />;
  }

  return null;
};

const useActions = ({
  applyActionProps,
  viewActionProps,
  state = "open",
  githubLink,
  assignee,
}: GetActionsProps): GetActionsReturn => {
  const githubLinkComponent = useGithubLinkComponent({ githubLink });
  const assigneeComponent = useAssigneeComponent({ assignee });
  const primaryActionComponent = usePrimaryActionComponent({ applyActionProps, viewActionProps, state });

  if (state === "open") {
    return [githubLinkComponent, primaryActionComponent];
  }

  if (state === "applied") {
    return [githubLinkComponent, primaryActionComponent];
  }

  if (state === "assigned") {
    return [assigneeComponent, githubLinkComponent];
  }

  return [];
};

export const useCardIssue = {
  useAssigneeComponent,
  usePrimaryActionComponent,
  useGithubLinkComponent,
  useActions,
};
