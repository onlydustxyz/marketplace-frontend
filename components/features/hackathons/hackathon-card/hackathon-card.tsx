import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { TagIcon } from "components/atoms/tag/variants/tag-icon";
import { Typo } from "components/atoms/typo";
import {
  HackathonCardPort,
  HackathonCardStatusProps,
} from "components/features/hackathons/hackathon-card/hackathon-card.types";
import { mapHackathonStatusToTag } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { BaseLink } from "components/layout/base-link/base-link";
import { ClientOnly } from "components/layout/client-only/client-only";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { AvatarGroup } from "components/molecules/avatar-group";

import { NEXT_ROUTER } from "constants/router";

import { HackathonCardVariants } from "./hackathon-card.variants";

function HackathonCardStatus({
  status,
  subscriberCount,
  openIssueCount,
  issueCount,
  adaptMapStatusToTag = mapHackathonStatusToTag,
}: HackathonCardStatusProps) {
  const { tagIcon, tagText } = adaptMapStatusToTag(status);

  if (!status) return null;

  if (status === "live" && (subscriberCount || (openIssueCount && issueCount))) {
    return (
      <>
        <div className="hidden items-center gap-3 sm:flex">
          {subscriberCount ? (
            <div className="min-w-40 flex flex-col gap-2 rounded-xl border border-container-stroke-separator bg-interactions-white-disabled p-3">
              <div className="flex items-center gap-1">
                <Icon remixName="ri-user-3-line" />

                <Typo size="xs" weight="medium" translate={{ token: "v2.features.hackathonCard.applicants" }} />
              </div>

              <Typo size="2xl" weight="medium">
                {subscriberCount}
              </Typo>
            </div>
          ) : null}

          {openIssueCount && issueCount ? (
            <div className="min-w-40 flex flex-col gap-2 rounded-xl border border-container-stroke-separator bg-interactions-white-disabled p-3">
              <div className="flex items-center gap-1">
                <Icon remixName="ri-code-line" />

                <Typo size="xs" weight="medium" translate={{ token: "v2.features.hackathonCard.issuesOpen" }} />
              </div>

              <Typo size="2xl" weight="medium">
                {openIssueCount} <span className="text-text-2">/ {issueCount}</span>
              </Typo>
            </div>
          ) : null}
        </div>

        {tagIcon ? (
          <TagIcon
            color="blue"
            style="outline"
            icon={{ remixName: tagIcon }}
            classNames={{ base: "h-fit block sm:hidden" }}
          >
            {tagText}
          </TagIcon>
        ) : (
          <Tag color="blue" style="outline" classNames={{ base: "h-fit block sm:hidden" }}>
            {tagText}
          </Tag>
        )}
      </>
    );
  }

  if (tagIcon) {
    return (
      <TagIcon color="blue" style="outline" icon={{ remixName: tagIcon }} classNames={{ base: "h-fit" }}>
        {tagText}
      </TagIcon>
    );
  }

  return (
    <Tag color="blue" style="outline" classNames={{ base: "h-fit" }}>
      {tagText}
    </Tag>
  );
}

export function HackathonCard<C extends ElementType = "div">({
  htmlProps,
  classNames,
  title,
  upperTitle = <Translate token="v2.features.hackathonCard.title" as="span" />,
  buttonLabel = <Translate token="v2.features.hackathonCard.button" />,
  slug,
  backgroundImage,
  location,
  status,
  projects,
  hasLayer,
  subscriberCount,
  openIssueCount,
  issueCount,
  adaptMapStatusToTag = mapHackathonStatusToTag,
  dates,
  showCta = true,
}: HackathonCardPort<C>) {
  const Component = slug ? BaseLink : "article";
  const paperHtmlProps = slug
    ? {
        href: NEXT_ROUTER.hackathons.details.root(slug),
        ...htmlProps,
      }
    : htmlProps;
  const slots = HackathonCardVariants();

  return (
    <Paper
      as={Component}
      htmlProps={{ ...paperHtmlProps }}
      size="l"
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
    >
      <img
        src={backgroundImage}
        alt={title}
        loading="lazy"
        className="pointer-events-none absolute -left-[5px] -top-[5px] h-[calc(100%_+_10px)] w-[calc(100%_+_10px)] max-w-[initial] object-cover object-center"
      />
      {hasLayer ? <span className="absolute inset-0 h-full w-full rounded-xl bg-black bg-opacity-60" /> : null}

      <div className="relative flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Typo size="l" weight="medium">
              {upperTitle}
            </Typo>

            <Typo variant="brand" size="4xl">
              {title}
            </Typo>
          </div>

          <HackathonCardStatus
            status={status}
            subscriberCount={subscriberCount}
            openIssueCount={openIssueCount}
            issueCount={issueCount}
            adaptMapStatusToTag={adaptMapStatusToTag}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            {location ? (
              <div className="flex items-center gap-2">
                <Paper
                  size="s"
                  as="div"
                  classNames={{
                    base: "inline-flex",
                  }}
                >
                  <Icon remixName="ri-map-pin-line" />
                </Paper>

                <Typo size="s" weight="medium">
                  {location}
                </Typo>
              </div>
            ) : null}

            <ClientOnly>
              <div className="flex items-center gap-2">
                <Paper
                  size="s"
                  as="div"
                  classNames={{
                    base: "inline-flex",
                  }}
                >
                  <Icon remixName="ri-calendar-2-line" />
                </Paper>

                <div className="flex flex-col">
                  <Typo size="s" weight="medium">
                    {dates.startDate} - {dates.endDate}
                  </Typo>

                  <Typo size="xxs" color="text-2">
                    {dates.startTime}
                  </Typo>
                </div>
              </div>
            </ClientOnly>
          </div>

          {projects?.length ? (
            <>
              <AvatarGroup
                avatars={projects.map(({ logoUrl }) => ({ src: logoUrl }))}
                size="xl"
                maxAvatars={4}
                classNames={{ base: "hidden sm:flex" }}
              />
              <AvatarGroup
                avatars={projects.map(({ logoUrl }) => ({ src: logoUrl }))}
                size="m"
                maxAvatars={4}
                classNames={{ base: "flex sm:hidden" }}
              />
            </>
          ) : null}
        </div>

        {slug && showCta ? (
          <Button
            as={"div"}
            variant={status === "closed" ? "secondary-light" : "primary"}
            size="l"
            endIcon={{
              remixName: "ri-arrow-right-line",
            }}
          >
            {buttonLabel}
          </Button>
        ) : null}
      </div>
    </Paper>
  );
}
