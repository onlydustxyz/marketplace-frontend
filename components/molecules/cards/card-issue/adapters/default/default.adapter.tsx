import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "src/utils/cn";

import { Avatar, AvatarPort } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
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
    <Component {...htmlProps} className="flex items-center gap-1">
      {!!iconName && <Icon remixName={iconName} size={16} />}

      {!!avatar && <Avatar size="xs" {...avatar} />}

      <Typo size="xs" color="text-2">
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
  assignedActionProps,
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
  githubUsername,
  classNames,
  ...htmlProps
}: CardIssuePort<C>) {
  const slots = CardIssueDefaultVariants();

  const action = useCardIssue.useAction({
    applyActionProps,
    viewActionProps,
    assignedActionProps,
    status,
    assignee,
    githubUsername,
  });
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
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="line-clamp-2 flex-1">
            <Typo size="s" weight="medium" as="div">
              {title}
            </Typo>
          </div>

          {githubLink ? (
            <Button
              as={BaseLink}
              variant="secondary-light"
              htmlProps={{ href: githubLink }}
              startIcon={{ remixName: "ri-github-line" }}
              hideText
            />
          ) : null}
        </div>

        <div className="flex w-full flex-wrap gap-x-2 gap-y-1">
          <LabelledIcon iconName="ri-time-line">{_createdAt}</LabelledIcon>

          <LabelledIcon avatar={createdBy?.avatar} childrenPrefix={tokens.createdBy}>
            {createdBy?.name}
          </LabelledIcon>

          <LabelledIcon iconName="ri-github-line" as="a" htmlProps={{ href: repo?.href, target: "_blank" }}>
            {repo?.name}
          </LabelledIcon>
        </div>
      </div>

      {!!applicants?.length && (
        <div className="flex items-center gap-1">
          <AvatarGroup avatars={applicants.map(({ avatarUrl }) => ({ src: avatarUrl }))} size="xs" maxAvatars={4} />

          <Typo size="xs" color="text-2">
            {applicantsCount || applicants.length}
            &nbsp;
            {tokens.applicantsCount}
          </Typo>
        </div>
      )}

      <div className="flex w-full items-center justify-between gap-2">
        {!!tags?.length && (
          <div className="flex w-full flex-wrap gap-1">
            {tags?.map((t, key) => (
              <Tag key={key} size="s" shape="round" style="outline" color="grey" {...t} />
            ))}
          </div>
        )}

        <div className="whitespace-nowrap">{action}</div>
      </div>
    </Paper>
  );
}
