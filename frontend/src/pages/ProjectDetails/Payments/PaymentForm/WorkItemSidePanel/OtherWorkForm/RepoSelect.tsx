import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { RepositoryOwnerAndNameFragment } from "src/__generated/graphql";

type Props = {
  repos: RepositoryOwnerAndNameFragment[];
  repo: RepositoryOwnerAndNameFragment;
  setRepo: (repo: RepositoryOwnerAndNameFragment) => void;
};

export default function RepoSelect({ repos, repo, setRepo }: Props) {
  const { T } = useIntl();

  return (
    <div className="relative flex flex-col gap-2 w-full">
      <div className="font-walsheim font-normal text-sm text-white">
        {T("payment.form.workItems.other.footer.repository")}
      </div>
      <Listbox value={repo} onChange={setRepo} disabled={repos.length < 2}>
        <Listbox.Button
          data-testid="select-repo-button"
          as="div"
          className={classNames(
            "relative flex flex-row px-2.5 py-1.5 gap-2 items-center font-medium font-walsheim text-sm text-greyscale-50 bg-white/5 border border-greyscale-50/8 rounded-lg",
            {
              "cursor-pointer": repos.length > 1,
            }
          )}
        >
          {({ value }) => (
            <>
              <GitRepositoryLine />
              {value.name}
              {repos.length > 1 && <ArrowDownSLine className="absolute right-2 text-spaceBlue-200 text-xl" />}
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
              className="cursor-pointer flex flex-row items-center gap-2 hover:bg-white/5 font-medium font-walsheim text-sm text-greyscale-50 px-3 py-2"
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
