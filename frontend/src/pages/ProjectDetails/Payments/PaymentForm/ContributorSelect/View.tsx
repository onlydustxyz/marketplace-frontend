import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import User3Line from "src/icons/User3Line";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";
import Badge, { BadgeIcon, BadgeSize } from "src/components/Badge";
import { withTooltip } from "src/components/Tooltip";
import Contributor from "src/components/Contributor";
import { Virtuoso } from "react-virtuoso";
import { forwardRef } from "react";
import { Contributor as ContributorType } from "src/pages/ProjectDetails/Payments/PaymentForm/types";

const MAX_CONTRIBUTOR_SELECT_SCROLLER_HEIGHT_PX = 240;
const CONTRIBUTOR_SELECT_LINE_HEIGHT_PX = 36;

interface ContributorSelectViewProps {
  selectedGithubHandle: string | null;
  setSelectedGithubHandle: (selectedGithubHandle: string | null) => void;
  githubHandleSubstring: string;
  setGithubHandleSubstring: (githubHandleSubstring: string) => void;
  filteredContributors?: ContributorType[];
  filteredExternalContributors: ContributorType[] | undefined;
  isSearchGithubUsersByHandleSubstringQueryLoading: boolean;
  contributor: ContributorType | null | undefined;
  debouncedGithubHandleSubstring: string;
}

export default function ContributorSelectView({
  selectedGithubHandle,
  setSelectedGithubHandle,
  githubHandleSubstring,
  setGithubHandleSubstring,
  filteredContributors,
  filteredExternalContributors,
  isSearchGithubUsersByHandleSubstringQueryLoading,
  contributor,
  debouncedGithubHandleSubstring,
}: ContributorSelectViewProps) {
  const { T } = useIntl();

  const contributorLines = buildContributorLines(
    githubHandleSubstring,
    filteredContributors,
    filteredExternalContributors
  );

  return (
    <Combobox value={selectedGithubHandle} onChange={setSelectedGithubHandle}>
      {({ open }) => (
        <div className={classNames("absolute top-0 w-full", { "rounded-2xl bg-whiteFakeOpacity-5": open })}>
          <div
            className={classNames("flex flex-col gap-3", {
              "overflow-hidden rounded-2xl outline outline-1 outline-whiteFakeOpacity-12 backdrop-blur-4xl": open,
            })}
          >
            <Combobox.Button className="px-3 pt-4" as="div">
              {!open && (
                <div
                  className={classNames(
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
                    {!selectedGithubHandle && <div>{T("payment.form.contributor.select.placeholder")}</div>}
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
                  className={classNames(
                    "flex h-12 w-full flex-row items-center justify-between rounded-2xl border border-greyscale-50/8 px-4",
                    {
                      "bg-white/5 text-greyscale-50": githubHandleSubstring,
                      "ring-solid bg-spacePurple-900 text-spacePurple-500 ring-2 ring-spacePurple-500":
                        githubHandleSubstring === "",
                    }
                  )}
                >
                  <div className="flex w-full cursor-default flex-row items-center gap-2.5">
                    <div className="pt-1 text-2xl">
                      <User3Line />
                    </div>
                    <Combobox.Input
                      onChange={event => setGithubHandleSubstring(event.target.value)}
                      className={classNames("w-full border-none bg-transparent text-base font-medium outline-none")}
                      onFocus={() => {
                        setGithubHandleSubstring("");
                      }}
                      value={githubHandleSubstring}
                      data-testid="contributor-selection-input"
                    />
                  </div>
                  <ArrowDownSLine />
                </div>
              )}
            </Combobox.Button>
            <Combobox.Options>
              {filteredContributors &&
              filteredContributors.length === 0 &&
              githubHandleSubstring &&
              githubHandleSubstring.length < 3 ? (
                <div className="px-4 pb-6 text-sm italic text-greyscale-100 xl:text-base">
                  {T("payment.form.contributor.select.fallback.typeMoreCharacters")}
                </div>
              ) : filteredContributors &&
                filteredContributors.length === 0 &&
                (!filteredExternalContributors ||
                  (filteredExternalContributors && filteredExternalContributors.length === 0)) &&
                !isSearchGithubUsersByHandleSubstringQueryLoading &&
                debouncedGithubHandleSubstring === githubHandleSubstring ? (
                <div className="pb-6">
                  <span className="px-4 pb-6 italic text-greyscale-100">
                    {T("payment.form.contributor.select.fallback.noUser")}
                  </span>
                </div>
              ) : contributorLines.length > 0 ? (
                <VirtualizedContributorSubList lines={contributorLines} />
              ) : (
                <div />
              )}
            </Combobox.Options>
          </div>
        </div>
      )}
    </Combobox>
  );
}

function buildContributorLines(
  githubHandleSubstring: string,
  filteredContributors?: ContributorType[],
  filteredExternalContributors?: ContributorType[]
) {
  const showExternalUsersSection = !!(githubHandleSubstring && githubHandleSubstring.length > 2);

  let lines: Line[] = [];

  if (filteredContributors && filteredContributors.length > 0) {
    lines = lines.concat(
      filteredContributors.map(contributor => ({
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

interface ContributorSubListProps {
  lines?: Line[];
}

const List = forwardRef<HTMLDivElement>((props, ref) => {
  return <div className="divide-y divide-greyscale-50/8 px-4 pt-2.5" {...props} ref={ref} />;
});

List.displayName = "List";

const Scroller = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded scrollbar-w-1.5"
      {...props}
      ref={ref}
    />
  );
});

Scroller.displayName = "Scroller";

function VirtualizedContributorSubList({ lines }: ContributorSubListProps) {
  const { T } = useIntl();

  return (
    <Virtuoso
      style={{
        height: Math.min(
          lines?.length ? lines.length * CONTRIBUTOR_SELECT_LINE_HEIGHT_PX : MAX_CONTRIBUTOR_SELECT_SCROLLER_HEIGHT_PX,
          MAX_CONTRIBUTOR_SELECT_SCROLLER_HEIGHT_PX
        ),
      }}
      data={lines}
      components={{ List, Scroller }}
      itemContent={(_, line) => {
        if (line.type === LineType.Contributor) {
          const contributor = line.contributor;
          return (
            <Combobox.Option
              key={contributor.githubUserId}
              value={contributor.login}
              className="flex items-center justify-between p-2 ui-active:cursor-pointer ui-active:bg-white/4"
            >
              <Contributor contributor={contributor} />
              {contributor.unpaidMergedPullsCount > 0 && (
                <Badge
                  value={contributor.unpaidMergedPullsCount}
                  icon={BadgeIcon.GitMerge}
                  size={BadgeSize.Small}
                  {...withTooltip(T("payment.form.contributor.unpaidMergedPrCountTooltip"))}
                />
              )}
            </Combobox.Option>
          );
        } else if (line.type === LineType.Separator) {
          return (
            <div className="text-md pb-1 pt-4 font-medium text-spaceBlue-200">
              {T("payment.form.contributor.select.externalUsers")}
            </div>
          );
        } else {
          return <div className="pb-6" />;
        }
      }}
    />
  );
}
