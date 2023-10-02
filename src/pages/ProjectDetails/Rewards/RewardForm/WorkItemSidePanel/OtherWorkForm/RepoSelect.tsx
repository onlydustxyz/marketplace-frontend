import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { GithubRepoFragment } from "src/__generated/graphql";
import { withTooltip } from "src/components/Tooltip";

type Props = {
  repos: GithubRepoFragment[];
  repo: GithubRepoFragment;
  setRepo: (repo: GithubRepoFragment) => void;
};

export default function RepoSelect({ repos, repo, setRepo }: Props) {
  const { T } = useIntl();

  return (
    <div className="relative flex w-48 flex-col gap-2">
      <div className="font-walsheim text-sm font-normal text-white">
        {T("reward.form.contributions.other.footer.repository")}
      </div>
      <Listbox value={repo} onChange={setRepo} disabled={repos.length < 2}>
        <Listbox.Button
          data-testid="select-repo-button"
          as="div"
          className={classNames(
            "relative flex flex-row items-center gap-2 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 font-walsheim text-sm font-medium",
            {
              "text-greyscale-50": repo.hasIssues,
              "text-greyscale-600": !repo.hasIssues,
              "cursor-pointer": repos.length > 1,
            }
          )}
          {...withTooltip(T("reward.form.contributions.other.footer.noIssues"), {
            className: "w-80",
            visible: !repo.hasIssues,
          })}
        >
          {({ value }) => (
            <>
              <GitRepositoryLine />
              {value.name}
              {repos.length > 1 && <ArrowDownSLine className="absolute right-2 text-xl text-spaceBlue-200" />}
            </>
          )}
        </Listbox.Button>
        <Listbox.Options
          data-testid="select-repo-options"
          as="div"
          className="absolute bottom-10 w-full divide-y divide-greyscale-50/8 rounded-lg border border-greyscale-50/8"
        >
          {repos.map(repo => (
            <Listbox.Option
              key={`${repo?.owner}-${repo?.name}`}
              value={repo}
              as="div"
              className={classNames(
                "flex cursor-pointer flex-row items-center gap-2 px-3 py-2 font-walsheim text-sm font-medium ",
                {
                  "text-greyscale-50 hover:bg-white/5": repo.hasIssues,
                  "text-greyscale-600": !repo.hasIssues,
                }
              )}
              disabled={!repo.hasIssues}
              {...withTooltip(T("reward.form.contributions.other.footer.noIssues"), {
                className: "w-80",
                visible: !repo.hasIssues,
              })}
            >
              <GitRepositoryLine />
              {repo?.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
