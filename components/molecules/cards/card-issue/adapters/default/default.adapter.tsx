import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "src/utils/cn";

import { Avatar, AvatarPort } from "components/atoms/avatar";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { AvatarGroup } from "components/molecules/avatar-group";
import { useCardIssue } from "components/molecules/cards/card-issue/card-issue.hooks";

import { CardIssuePort } from "../../card-issue.types";
import { CardIssueDefaultVariants } from "./default.variants";

function LabelledIcon<C extends ElementType = "div">({
  iconName,
  children,
  as,
  avatar,
  childrenPrefix,
  ...htmlProps
}: {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  avatar?: AvatarPort;
  iconName?: RemixIconsName;
  children: ReactNode;
  childrenPrefix?: ReactNode;
}) {
  const Component = as || "div";

  if (!children) {
    return null;
  }

  return (
    <Component {...htmlProps} className="flex flex-row items-center justify-start gap-1">
      {!!iconName && <Icon remixName={iconName} size={16} />}
      {!!avatar && <Avatar size={"xs"} {...avatar} />}
      <Typo size={"xs"} weight="medium" color="text-2">
        {childrenPrefix}
        &nbsp;
        {children}
      </Typo>
    </Component>
  );
}

export function CardIssueDefaultAdapter<C extends ElementType = "div">({
  as,
  title,
  tags,
  applyActionProps,
  viewActionProps,
  githubLink,
  assignee,
  createdAt,
  repo,
  applicants,
  createdBy,
  tokens,
  status = "open",
  paperProps = {},
  applicantsCount,
  classNames,
  ...htmlProps
}: CardIssuePort<C>) {
  const slots = CardIssueDefaultVariants();
  const actions = useCardIssue.useActions({ applyActionProps, viewActionProps, status, githubLink, assignee, tokens });
  const _createdAt = useCardIssue.useCreatedAt({ createdAt });

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
        <div className="flex flex-row justify-end gap-1">{actions.map(action => action)}</div>
      </div>
      <div className="flex w-full flex-row justify-start gap-2">
        <LabelledIcon iconName={"ri-time-line"}>{_createdAt}</LabelledIcon>
        <LabelledIcon avatar={createdBy?.avatar} childrenPrefix={tokens.createdBy}>
          {createdBy?.name}
        </LabelledIcon>
        <LabelledIcon iconName={"ri-github-line"} as={"a"} htmlProps={{ href: repo?.href, target: "_blank" }}>
          {repo?.name}
        </LabelledIcon>
        {!!applicants?.length && (
          <div className="flex flex-row items-center justify-start gap-1">
            <AvatarGroup avatars={applicants.map(({ avatarUrl }) => ({ src: avatarUrl }))} size="xs" maxAvatars={4} />
            <Typo size={"xs"} weight="medium" color="text-2">
              {applicantsCount || applicants.length}
              &nbsp;
              {tokens.applicantsCount}
            </Typo>
          </div>
        )}
      </div>
      {!!tags?.length && (
        <div className="flex w-full justify-start gap-1">
          {tags?.map((t, key) => (
            <Tag key={key} size={"xs"} shape={"round"} style={"outline"} color="grey" {...t} />
          ))}
        </div>
      )}
    </Paper>
  );
}
