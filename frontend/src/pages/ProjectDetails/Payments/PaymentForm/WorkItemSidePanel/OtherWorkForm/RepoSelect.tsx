import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { GithubRepoFragment } from "src/__generated/graphql";

type Props = {
  repos: GithubRepoFragment[];
  repo: GithubRepoFragment;
  setRepo: (repo: GithubRepoFragment) => void;
};

export default function RepoSelect({ repos, repo, setRepo }: Props) {
  const { T } = useIntl();

  return (
    <div className="relative flex w-full flex-col gap-2">
      <div className="font-walsheim text-sm font-normal text-white">
        {T("payment.form.workItems.other.footer.repository")}
      </div>
      <Listbox value={repo} onChange={setRepo} disabled={repos.length < 2}>
        <Listbox.Button
          data-testid="select-repo-button"
          as="div"
          className={classNames(
            "relative flex flex-row items-center gap-2 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 font-walsheim text-sm font-medium text-greyscale-50",
            {
              "cursor-pointer": repos.length > 1,
            }
          )}
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
          className="absolute bottom-10 w-full divide-y divide-greyscale-50/8 rounded-lg border border-greyscale-50/8 backdrop-blur-4xl"
        >
          {repos.map(repo => (
            <Listbox.Option
              key={`${repo?.owner}-${repo?.name}`}
              value={repo}
              as="div"
              className="flex cursor-pointer flex-row items-center gap-2 px-3 py-2 font-walsheim text-sm font-medium text-greyscale-50 hover:bg-white/5"
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
