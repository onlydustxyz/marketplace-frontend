import { gql } from "@apollo/client";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { sortBy } from "lodash";
import { useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Callout from "src/components/Callout";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import Attachment2 from "src/icons/Attachment2";
import CheckLine from "src/icons/CheckLine";
import DraftLine from "src/icons/DraftLine";
import ExchangeDollarLine from "src/icons/ExchangeDollarLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import MoreLine from "src/icons/MoreLine";
import TeamLine from "src/icons/TeamLine";
import { HasuraUserRole } from "src/types";
import {
  GetProjectReposDocument,
  GetProjectReposQuery,
  RepositoryOwnerAndNameFragment,
  RepositoryOwnerAndNameFragmentDoc,
} from "src/__generated/graphql";

type WorkKind = {
  icon: ReactElement;
  labelKey: string;
};

const WORK_KINDS: WorkKind[] = [
  { icon: <DraftLine />, labelKey: "payment.form.workItems.other.kinds.documentation" },
  { icon: <TeamLine />, labelKey: "payment.form.workItems.other.kinds.meeting" },
  { icon: <ExchangeDollarLine />, labelKey: "payment.form.workItems.other.kinds.subscription" },
  { icon: <MoreLine />, labelKey: "payment.form.workItems.other.kinds.other" },
];

type Props = {
  projectId: string;
};

export default function OtherWorkForm({ projectId }: Props) {
  const { T } = useIntl();

  const [selectedWorkKind, setSelectedWorkKind] = useState<WorkKind | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryOwnerAndNameFragment | null>();
  const [description, setDescription] = useState<string | null>(null);

  const { data } = useHasuraQuery<GetProjectReposQuery>(GetProjectReposDocument, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const options = Object.values(WORK_KINDS);

  const repos = sortBy(
    data?.projectsByPk?.githubRepos.map(repo => repo.githubRepoDetails),
    "name"
  );

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="font-belwe font-normal text-base text-greyscale-50">
        {T("payment.form.workItems.other.title")}
      </div>
      <Listbox onChange={setSelectedWorkKind}>
        <Listbox.Options static as="div" className="flex flex-wrap gap-x-2 gap-y-3">
          {options.map(option => (
            <Listbox.Option
              key={options.indexOf(option)}
              as="div"
              value={option}
              className={classNames(
                "flex flex-row gap-1 items-center",
                "py-2 px-3 w-fit text-neutral-100 font-walsheim font-normal text-sm bg-white/8 border border-greyscale-50/8 rounded-xl",
                "hover:cursor-pointer",
                "ui-selected:pseudo-outline-2",
                "ui-selected:before:z-10",
                "ui-selected:before:border-spacePurple-500",
                "ui-selected:border-transparent ui-selected:bg-spacePurple-900"
              )}
            >
              {option.icon}
              {T(option.labelKey)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <textarea
        placeholder={T("payment.form.workItems.other.descriptionPlaceholder")}
        className={classNames(
          "w-full py-3 px-4 h-36 resize-none",
          "border border-greyscale-50/8 outline-none rounded-xl bg-white/5",
          "font-walsheim font-normal text-base text-greyscale-50 placeholder:text-greyscale-500",
          "scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
        )}
        onChange={({ target }) => setDescription(target.value)}
      />
      <div className="flex flex-row justify-between items-center px-4 py-3 font-belwe font-normal text-base text-greyscale-50 rounded-lg border border-greyscale-50/12">
        {T("payment.form.workItems.other.attachments.title")}
        <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
          <Attachment2 />
          {T("payment.form.workItems.other.attachments.addButton")}
        </Button>
      </div>
      <Callout>{T("payment.form.workItems.other.callout")}</Callout>
      <div className="fixed bottom-0 inset-x-0 flex flex-row gap-8 px-6 py-6 bg-white/2 border-t border-greyscale-50/8">
        <div className="relative flex flex-col gap-2 w-full">
          {repos && repos.length > 0 && (
            <>
              <div className="font-walsheim font-normal text-sm text-white">
                {T("payment.form.workItems.other.footer.repository")}
              </div>
              <Listbox
                defaultValue={repos[0]}
                value={selectedRepo}
                onChange={setSelectedRepo}
                disabled={repos.length < 2}
              >
                <Listbox.Button
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
            </>
          )}
        </div>
        <Button width={Width.Full} disabled={!selectedWorkKind || !description}>
          <CheckLine />
          {T("payment.form.workItems.other.footer.submitButton")}
        </Button>
      </div>
    </div>
  );
}

gql`
  ${RepositoryOwnerAndNameFragmentDoc}
  query GetProjectRepos($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      githubRepos {
        githubRepoDetails {
          ...RepositoryOwnerAndName
        }
      }
    }
  }
`;
