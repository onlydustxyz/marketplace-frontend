import { Accordion, AccordionItem, Selection } from "@nextui-org/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";
import { Contributor } from "components/features/contributor/contributor";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import { ApplyButton } from "./components/apply-button/apply-button";
import { TIssueCard } from "./issue-card.types";

export function IssueCard({ issue }: TIssueCard.Props) {
  const { T } = useIntl();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set("1"));
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  return (
    <Card key={issue.id} background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4 p-5 md:gap-3">
        <Flex justifyContent="between" className="gap-6">
          <Typography variant="body-m-bold" className="line-clamp-2">
            {issue.title}
          </Typography>

          {isMd ? <ApplyButton url={issue.htmlUrl} /> : null}
        </Flex>

        <Flex alignItems="center" className="gap-3 gap-y-2" wrap="wrap">
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-time-line" className="text-spaceBlue-100" />

            <Typography variant="body-xs" className="text-spaceBlue-100">
              {displayRelativeDate(issue.createdAt)}
            </Typography>
          </Flex>

          <Contributor
            login={issue.author.login || ""}
            avatarUrl={issue.author.avatarUrl}
            githubUserId={issue.author.githubUserId}
            isRegistered={issue.author.isRegistered}
            clickable={true}
            typograhy={{ variant: "body-xs" }}
            avatarProps={{ size: "xs" }}
          />

          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-git-repository-line" className="text-spaceBlue-100" />

            <Link href={issue.repository.htmlUrl} className="text-spaceBlue-100">
              <Typography variant="body-xs">{issue.repository.name}</Typography>
            </Link>
          </Flex>
        </Flex>

        <Flex wrap="wrap" className="gap-2">
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-price-tag-3-line" className="text-spaceBlue-100" />

            <Typography
              variant="body-xs"
              className="text-spaceBlue-100"
              translate={{ token: "v2.pages.project.overview.goodFirstIssues.labels.title" }}
            />
          </Flex>

          {issue.labels.length > 0 ? (
            <>
              {issue.labels.map(label => (
                <Flex key={label.name} className="rounded-full border border-greyscale-50/8 px-2 py-1">
                  <Typography variant="body-xs" className="whitespace-nowrap">
                    {label.name}
                  </Typography>
                </Flex>
              ))}
            </>
          ) : (
            <Flex className="rounded-full border border-greyscale-50/8 px-2 py-1">
              <Typography
                variant="body-xs"
                translate={{ token: "v2.pages.project.overview.goodFirstIssues.labels.none" }}
              />
            </Flex>
          )}
        </Flex>

        {!isMd ? <ApplyButton url={issue.htmlUrl} /> : null}

        <Accordion
          className="!p-0"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          defaultSelectedKeys={["1"]}
        >
          <AccordionItem
            key="1"
            className="!rounded-2xl !border-1 !border-card-border-light !bg-card-background-medium !px-0 !shadow-none"
            classNames={{
              content: "!px-4 !py-4",
              trigger: "!px-4 justify-start items-center",
              startContent: "!flex-shrink gap-2",
              indicator: "text-snow",
            }}
            indicator={({ isOpen }) => (
              <Icon
                remixName="ri-arrow-down-s-line"
                className={cn("transition-transform", { "rotate-180": isOpen })}
                size={24}
              />
            )}
            startContent={
              <div className="flex items-center gap-2">
                <Icon remixName="ri-bill-line" size={16} />
                <Typography
                  variant="body-m"
                  translate={{ token: "v2.pages.project.overview.goodFirstIssues.overview" }}
                  className="uppercase"
                />
              </div>
            }
            disableIndicatorAnimation
            aria-label={issue.title}
            // title={T("v2.pages.project.overview.goodFirstIssues.overview")}
          >
            {issue.body}
          </AccordionItem>
        </Accordion>
      </Flex>
    </Card>
  );
}
