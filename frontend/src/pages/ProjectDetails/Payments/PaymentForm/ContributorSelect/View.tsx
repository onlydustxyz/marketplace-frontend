import { Combobox } from "@headlessui/react";
import { GithubContributorFragment } from "src/__generated/graphql";
import classNames from "classnames";
import Contributor from "src/components/Contributor";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import User3Line from "src/icons/User3Line";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";
import Badge, { BadgeIcon, BadgeSize } from "src/components/Badge";

interface ContributorSelectViewProps {
  selectedGithubHandle: string | null;
  setSelectedGithubHandle: (selectedGithubHandle: string | null) => void;
  githubHandleSubstring: string;
  setGithubHandleSubstring: (githubHandleSubstring: string) => void;
  filteredContributors: (GithubContributorFragment[] & { unpaidMergedPullsCount?: number }) | undefined;
  filteredExternalContributors: GithubContributorFragment[] | undefined;
  isSearchGithubUsersByHandleSubstringQueryLoading: boolean;
  contributor: GithubContributorFragment | null | undefined;
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
}: ContributorSelectViewProps) {
  const { T } = useIntl();

  const showExternalUsersSection = !!(githubHandleSubstring && githubHandleSubstring.length > 2);

  return (
    <Combobox
      value={selectedGithubHandle}
      onChange={value => {
        setSelectedGithubHandle(value);
      }}
    >
      {({ open }) => (
        <div className={classNames("absolute w-full top-0", { "bg-whiteFakeOpacity-5 rounded-2xl": open })}>
          <div
            className={classNames("flex flex-col gap-3", {
              "outline outline-1 outline-whiteFakeOpacity-12 rounded-2xl backdrop-blur-4xl": open,
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
                      {contributor ? (
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
                    {contributor?.user?.userId && <img src={onlyDustLogo} className="w-3.5 ml-1.5" />}
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
                  <div className="flex flex-row items-center w-full cursor-default">
                    <div className="pt-1 text-2xl">
                      <User3Line />
                    </div>
                    <Combobox.Input
                      onChange={event => setGithubHandleSubstring(event.target.value)}
                      className={classNames(
                        "border-none outline-none w-full bg-transparent font-medium text-base pt-0.5"
                      )}
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
            <Combobox.Options className="max-h-60 scrollbar-thin scrollbar-w-1.5 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded overflow-auto px-4 pb-6">
              {filteredContributors && filteredContributors.length > 0 ? (
                <ContributorSubList contributors={filteredContributors} />
              ) : githubHandleSubstring && githubHandleSubstring.length < 3 ? (
                <span className="text-greyscale-100 italic">
                  {T("payment.form.contributor.select.fallback.typeMoreCharacters")}
                </span>
              ) : (
                <div />
              )}
              {showExternalUsersSection &&
                (filteredExternalContributors && filteredExternalContributors.length ? (
                  <>
                    <div className="font-medium text-md pb-1 pt-4 text-spaceBlue-200">
                      {T("payment.form.contributor.select.externalUsers")}
                    </div>
                    <ContributorSubList contributors={filteredExternalContributors} />
                  </>
                ) : filteredContributors &&
                  filteredContributors.length === 0 &&
                  !isSearchGithubUsersByHandleSubstringQueryLoading ? (
                  <span className="text-greyscale-100 italic">
                    {T("payment.form.contributor.select.fallback.noUser")}
                  </span>
                ) : (
                  <div />
                ))}
            </Combobox.Options>
          </div>
        </div>
      )}
    </Combobox>
  );
}

interface ContributorSubListProps<T extends GithubContributorFragment> {
  contributors?: (T & { unpaidMergedPullsCount?: number })[];
}

function ContributorSubList<T extends GithubContributorFragment>({ contributors }: ContributorSubListProps<T>) {
  return (
    <div className="divide-y divide-greyscale-50/8 pt-2.5">
      {contributors?.map(contributor => (
        <Combobox.Option key={contributor.id} value={contributor.login}>
          {({ active }) => (
            <li
              className={classNames("p-2 flex items-center justify-between", {
                "bg-white/4 cursor-pointer": active,
              })}
            >
              <Contributor
                contributor={{
                  avatarUrl: contributor.avatarUrl,
                  login: contributor.login,
                  isRegistered: !!contributor.user?.userId,
                }}
              />
              {contributor.unpaidMergedPullsCount && (
                <Badge value={contributor.unpaidMergedPullsCount} icon={BadgeIcon.GitMerge} size={BadgeSize.Small} />
              )}
            </li>
          )}
        </Combobox.Option>
      ))}
      <div />
    </div>
  );
}
