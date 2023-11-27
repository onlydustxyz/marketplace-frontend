import { Combobox } from "@headlessui/react";
import { cn } from "src/utils/cn";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import User3Line from "src/icons/User3Line";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";
import Badge, { BadgeIcon, BadgeSize } from "src/components/Badge";
import Contributor from "src/components/Contributor";
import { Virtuoso } from "react-virtuoso";
import { forwardRef, useCallback } from "react";
import { Contributor as ContributorType } from "src/pages/ProjectDetails/Rewards/RewardForm/types";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";
import { ShowMore } from "src/components/Table/ShowMore";
import { Spinner } from "src/components/Spinner/Spinner";

const MAX_CONTRIBUTOR_SELECT_SCROLLER_HEIGHT_PX = 240;
const CONTRIBUTOR_SELECT_LINE_HEIGHT_PX = 36;

type ShowMoreProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

type ContributorSelectViewProps = {
  selectedGithubHandle: string | null;
  setSelectedGithubHandle: (selectedGithubHandle: string | null) => void;
  internalContributors?: ContributorType[];
  filteredExternalContributors: ContributorType[] | undefined;
  isSearchGithubUsersByHandleSubstringQueryLoading: boolean;
  contributor: ContributorType | null | undefined;
  search: string;
  setSearch: (query: string) => void;
  isError: boolean;
} & ShowMoreProps;

export default function ContributorSelectView({
  selectedGithubHandle,
  setSelectedGithubHandle,
  internalContributors,
  filteredExternalContributors,
  isSearchGithubUsersByHandleSubstringQueryLoading,
  contributor,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  search,
  setSearch,
  isError,
}: ContributorSelectViewProps) {
  const { T } = useIntl();

  const renderOptionsContent = () => {
    if (isSearchGithubUsersByHandleSubstringQueryLoading) {
      return <Spinner className="mx-auto mb-6 mt-4" />;
    }

    if (isError) {
      return <div>{T("reward.form.contributor.select.fallback.error")}</div>;
    }

    if (internalContributors?.length === 0 && search?.length < 3) {
      return (
        <div className="px-4 pb-6 text-sm italic text-greyscale-100 xl:text-base">
          {T("reward.form.contributor.select.fallback.typeMoreCharacters")}
        </div>
      );
    }

    if (
      internalContributors?.length === 0 &&
      (!filteredExternalContributors || filteredExternalContributors.length === 0)
    ) {
      return (
        <div className="pb-6">
          <span className="px-4 pb-6 italic text-greyscale-100">
            {T("reward.form.contributor.select.fallback.noUser")}
          </span>
        </div>
      );
    }

    if (contributorLines.length > 0) {
      return (
        <VirtualizedContributorSubList
          lines={contributorLines}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      );
    }

    return <div />;
  };

  const contributorLines = buildContributorLines(search, internalContributors, filteredExternalContributors);

  return (
    <Combobox value={selectedGithubHandle} onChange={setSelectedGithubHandle}>
      {({ open }) => (
        <div className={cn("absolute top-0 w-full", { "rounded-2xl bg-whiteFakeOpacity-5": open })}>
          <div
            className={cn("flex flex-col gap-3", {
              "overflow-hidden rounded-2xl outline outline-1 outline-whiteFakeOpacity-12": open,
            })}
          >
            <Combobox.Button className="px-3 pt-4" as="div">
              {!open && (
                <div
                  className={cn(
                    "flex h-12 w-full cursor-pointer flex-row items-center justify-between rounded-2xl border border-greyscale-50/8 px-4",
                    {
                      "text-spaceBlue-200": !selectedGithubHandle,
                      "bg-white/5": selectedGithubHandle,
                    }
                  )}
                >
                  <div className="flex w-full flex-row items-center">
                    <div className="pr-2 text-2xl">
                      {contributor?.avatarUrl ? (
                        <div className="pr-0.5">
                          <RoundedImage
                            src={contributor.avatarUrl}
                            alt={contributor.login}
                            size={ImageSize.Sm}
                            rounding={Rounding.Circle}
                          />
                        </div>
                      ) : (
                        <div className="pt-1">
                          <User3Line />
                        </div>
                      )}
                    </div>
                    {!selectedGithubHandle && <div>{T("reward.form.contributor.select.placeholder")}</div>}
                    {selectedGithubHandle && (
                      <div className="font-medium" data-testid="contributor-selection-value">
                        {selectedGithubHandle}
                      </div>
                    )}
                    {contributor?.userId && <img src={onlyDustLogo} className="ml-1.5 w-3.5" />}
                  </div>
                  <ArrowDownSLine />
                </div>
              )}
              {open && (
                <div
                  className={cn(
                    "flex h-12 w-full flex-row items-center justify-between rounded-2xl border border-greyscale-50/8 px-4",
                    {
                      "bg-white/5 text-greyscale-50": search,
                      "ring-solid bg-spacePurple-900 text-spacePurple-500 ring-2 ring-spacePurple-500": search === "",
                    }
                  )}
                >
                  <div className="flex w-full cursor-default flex-row items-center gap-2.5">
                    <div className="pt-1 text-2xl">
                      <User3Line />
                    </div>
                    <Combobox.Input
                      onChange={event => setSearch(event.target.value)}
                      className={cn("w-full border-none bg-transparent text-base font-medium outline-none")}
                      onFocus={() => {
                        setSearch("");
                      }}
                      value={search}
                      data-testid="contributor-selection-input"
                      autoFocus
                    />
                  </div>
                  <ArrowDownSLine />
                </div>
              )}
            </Combobox.Button>
            <Combobox.Options>{renderOptionsContent()}</Combobox.Options>
          </div>
        </div>
      )}
    </Combobox>
  );
}

function buildContributorLines(
  githubHandleSubstring: string,
  internalContributors?: ContributorType[],
  filteredExternalContributors?: ContributorType[]
) {
  const showExternalUsersSection = !!(githubHandleSubstring && githubHandleSubstring.length > 2);

  let lines: Line[] = [];

  if (internalContributors && internalContributors.length > 0) {
    lines = lines.concat(
      internalContributors.map(contributor => ({
        type: LineType.Contributor,
        contributor,
      }))
    );
  }

  if (showExternalUsersSection && filteredExternalContributors && filteredExternalContributors.length) {
    lines.push({ type: LineType.Separator });
    lines = lines.concat(
      filteredExternalContributors.map(contributor => ({
        type: LineType.Contributor,
        contributor,
      }))
    );
  }

  lines.push({ type: LineType.LastLine });

  return lines;
}

enum LineType {
  Contributor = "Contributor",
  Separator = "Separator",
  LastLine = "LastLine",
}

type Line =
  | { type: LineType.Contributor; contributor: ContributorType }
  | { type: LineType.Separator }
  | { type: LineType.LastLine };

type ContributorSubListProps = {
  lines?: Line[];
} & ShowMoreProps;

const List = forwardRef<HTMLDivElement>((props, ref) => {
  return <div className="divide-y divide-greyscale-50/8 px-4 pt-2.5" {...props} ref={ref} />;
});

List.displayName = "List";

const Scroller = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5"
      {...props}
      ref={ref}
    />
  );
});

Scroller.displayName = "Scroller";

function VirtualizedContributorSubList({
  lines,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ContributorSubListProps) {
  const { T } = useIntl();
  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  const Footer = () => {
    if (hasNextPage) {
      return (
        <div className="my-4">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
        </div>
      );
    }
    return <></>;
  };

  return (
    <Virtuoso
      style={{
        height: Math.min(
          lines?.length ? lines.length * CONTRIBUTOR_SELECT_LINE_HEIGHT_PX : MAX_CONTRIBUTOR_SELECT_SCROLLER_HEIGHT_PX,
          MAX_CONTRIBUTOR_SELECT_SCROLLER_HEIGHT_PX
        ),
      }}
      data={lines}
      components={{ List, Scroller, Footer }}
      endReached={loadMore}
      itemContent={(_, line) => {
        if (line.type === LineType.Contributor) {
          const contributor = line.contributor;
          return (
            <Combobox.Option
              key={contributor.githubUserId}
              value={contributor.login}
              className="flex items-center justify-between p-2 ui-active:cursor-pointer ui-active:bg-white/4"
            >
              <Contributor contributor={contributor} userId={contributor.userId} />
              {contributor.unpaidCompletedContributions > 0 && (
                <>
                  <Badge
                    value={contributor.unpaidCompletedContributions}
                    icon={BadgeIcon.StackLine}
                    size={BadgeSize.Small}
                    data-tooltip-id="to-reward-details"
                    data-tooltip-content={JSON.stringify({
                      unpaidCompletedContributions: contributor.unpaidCompletedContributions,
                      unpaidIssueCount: contributor.unpaidCompletedIssuesCount,
                      unpaidPullRequestCount: contributor.unpaidMergedPullsCount,
                      unpaidCodeReviewCount: contributor.unpaidCompletedCodeReviewsCount,
                    })}
                  />
                  <ToRewardDetailsTooltip positionStrategy="fixed" />
                </>
              )}
            </Combobox.Option>
          );
        } else if (line.type === LineType.Separator) {
          return (
            <div className="text-md pb-1 pt-4 font-medium text-spaceBlue-200">
              {T("reward.form.contributor.select.externalUsers")}
            </div>
          );
        } else {
          return <div className="pb-6" />;
        }
      }}
    />
  );
}
