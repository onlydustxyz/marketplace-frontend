import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";

import { CardIssuePort } from "../../card-issue.types";
import { CardIssueDefaultVariants } from "./default.variants";

export function CardIssueDefaultAdapter<C extends ElementType = "div">({
  as,
  title,
  tags,
  primaryActionProps,
  primaryActionTokens,
  githubLink,
  assignee,
  createdAt,
  repo,
  applicants,
  createdBy,
  state = "open",
  paperProps = {},
  classNames,
  ...props
}: CardIssuePort<C>) {
  const { ...htmlProps } = props;
  const slots = CardIssueDefaultVariants();

  return (
    <Paper
      container={"1"}
      as={as}
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
      {...paperProps}
      {...htmlProps}
    >
      <div className="flex w-full flex-row justify-between gap-1">
        <div className="flex-1">
          <Typo size={"s"} weight="medium" as={"div"}>
            {title}
          </Typo>
        </div>
        <div className="flex flex-row justify-end gap-1">
          <p>action1</p>
          <p>button1</p>
        </div>
      </div>
      <div className="flex w-full flex-row justify-start gap-2">
        <p>time</p>
        <p>createdBy</p>
        <p>repoName</p>
        <p>applicants</p>
      </div>
      <div className="flex w-full justify-start gap-1">
        {tags?.map((t, key) => (
          <Tag key={key} size={"xs"} shape={"round"} style={"outline"} color="grey" {...t} />
        ))}
      </div>
    </Paper>
  );
}
