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
        <div className={classNames("absolute w-full top-0", { "bg-whiteFakeOpacity-5 rounded-2xl": open })}>
          <div
            className={classNames("flex flex-col gap-3", {
              "outline outline-1 outline-whiteFakeOpacity-12 rounded-2xl backdrop-blur-4xl overflow-hidden": open,
            })}
          >
            <Combobox.Button className="px-3 pt-4" as="div">
              {!open && (
                <div
                  className={classNames(
                    "flex flex-row items-center justify-between w-full rounded-2xl px-4 h-12 border border-greyscale-50/8 cursor-pointer",
                    {
                      "text-spaceBlue-200": !selectedGithubHandle,
                      "bg-white/5": selectedGithubHandle,
                    }
                  )}
                >
                  <div className="flex flex-row items-center w-full">
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
                    {contributor?.userId && <img src={onlyDustLogo} className="w-3.5 ml-1.5" />}
                  </div>
                  <ArrowDownSLine />
                </div>
              )}
              {open && (
                <div
                  className={classNames(
                    "flex flex-row items-center justify-between w-full rounded-2xl px-4 h-12 border border-greyscale-50/8",
                    {
                      "text-greyscale-50 bg-white/5": githubHandleSubstring,
                      "bg-spacePurple-900 text-spacePurple-500 ring-solid ring-2 ring-spacePurple-500":
                        githubHandleSubstring === "",
                    }
                  )}
                >
                  <div className="flex flex-row items-center w-full cursor-default gap-2.5">
                    <div className="pt-1 text-2xl">
                      <User3Line />
                    </div>
                    <Combobox.Input
                      onChange={event => setGithubHandleSubstring(event.target.value)}
                      className={classNames("border-none outline-none w-full bg-transparent font-medium text-base")}
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
                <div className="pb-6">
                  <span className="text-greyscale-100 italic pb-6 px-4">
                    {T("payment.form.contributor.select.fallback.typeMoreCharacters")}
                  </span>
                </div>
              ) : filteredContributors &&
                filteredContributors.length === 0 &&
                (!filteredExternalContributors ||
                  (filteredExternalContributors && filteredExternalContributors.length === 0)) &&
                !isSearchGithubUsersByHandleSubstringQueryLoading &&
                debouncedGithubHandleSubstring === githubHandleSubstring ? (
                <div className="pb-6">
                  <span className="text-greyscale-100 italic pb-6 px-4">
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
  return <div className="divide-y divide-greyscale-50/8 pt-2.5 px-4" {...props} ref={ref} />;
});

List.displayName = "List";

const Scroller = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="scrollbar-thin scrollbar-w-1.5 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded overflow-y-auto overflow-x-hidden"
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
              className="p-2 flex items-center justify-between ui-active:bg-white/4 ui-active:cursor-pointer"
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
            <div className="font-medium text-md pb-1 pt-4 text-spaceBlue-200">
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
