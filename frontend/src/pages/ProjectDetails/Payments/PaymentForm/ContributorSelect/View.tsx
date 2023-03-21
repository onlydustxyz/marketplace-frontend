import { Combobox } from "@headlessui/react";
import { GithubContributorFragment } from "src/__generated/graphql";
import classNames from "classnames";
import Contributor from "src/components/Contributor";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import User3Line from "src/icons/User3Line";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useTextWidth } from "@tag0/use-text-width";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";

interface ContributorSelectViewProps {
  selectedGithubHandle: string | null;
  setSelectedGithubHandle: (selectedGithubHandle: string | null) => void;
  githubHandleSubstring: string | null;
  setGithubHandleSubstring: (githubHandleSubstring: string | null) => void;
  filteredContributors: GithubContributorFragment[] | undefined;
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

  const githubHandleSubstringTextWidth = useTextWidth({
    text: githubHandleSubstring || "",
    font: "500 16px GT Walsheim",
  });

  const selectedGithubHandleTextWidth = useTextWidth({
    text: selectedGithubHandle || "",
    font: "500 16px GT Walsheim",
  });

  const showExternalUsersSection = !!(githubHandleSubstring && githubHandleSubstring.length > 2);

  return (
    <Combobox value={selectedGithubHandle} onChange={setSelectedGithubHandle} nullable>
      {({ open }) => (
        <div className={classNames("absolute w-full top-0", { "bg-[#111127] rounded-2xl": open })}>
          <div
            className={classNames("flex flex-col gap-3", {
              "outline outline-greyscale-50/12 rounded-2xl backdrop-blur-4xl": open,
            })}
          >
            <Combobox.Button className={classNames("px-3 pt-4 text-spaceBlue-200")}>
              <div
                className={classNames(
                  "flex flex-row items-center justify-between w-full bg-white/5 rounded-2xl px-4 h-12 border border-greyscale-50/8",
                  {
                    "ring-solid ring-2 ring-spacePurple-500": open,
                  }
                )}
              >
                <div className="flex flex-row items-center w-full cursor-default">
                  <div className="pr-2 text-2xl">
                    {contributor ? (
                      <RoundedImage
                        src={contributor.avatarUrl}
                        alt={contributor.login}
                        size={ImageSize.Sm}
                        rounding={Rounding.Circle}
                      />
                    ) : (
                      <div className="pt-0.5">
                        <User3Line />
                      </div>
                    )}
                  </div>
                  <Combobox.Input
                    onChange={event => setGithubHandleSubstring(event.target.value)}
                    className={classNames(
                      "border-none outline-none w-full bg-transparent font-normal text-base pt-0.5",
                      { "text-white": githubHandleSubstring !== "" }
                    )}
                    placeholder={T("payment.form.contributor.select.placeholder")}
                    onFocus={() => {
                      setGithubHandleSubstring(selectedGithubHandle);
                    }}
                    style={{
                      width: Math.max(githubHandleSubstringTextWidth, selectedGithubHandleTextWidth) + 4 || 200,
                      padding: 0,
                    }}
                  />
                  {contributor?.user?.userId && contributor?.login === githubHandleSubstring && (
                    <img src={onlyDustLogo} className="w-3.5 ml-1.5" />
                  )}
                </div>
                <ArrowDownSLine />
              </div>
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
                  isSearchGithubUsersByHandleSubstringQueryLoading ? (
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
  contributors?: T[];
}

function ContributorSubList<T extends GithubContributorFragment>({ contributors }: ContributorSubListProps<T>) {
  return (
    <div className="divide-y divide-greyscale-50/8 pt-2.5">
      {contributors?.map(contributor => (
        <Combobox.Option key={contributor.id} value={contributor.login}>
          {({ active }) => (
            <li className={`p-2 ${active && "bg-white/4 cursor-pointer"}`}>
              <Contributor
                contributor={{
                  avatarUrl: contributor.avatarUrl,
                  login: contributor.login,
                  isRegistered: !!contributor.user?.userId,
                }}
              />
            </li>
          )}
        </Combobox.Option>
      ))}
      <div />
    </div>
  );
}
