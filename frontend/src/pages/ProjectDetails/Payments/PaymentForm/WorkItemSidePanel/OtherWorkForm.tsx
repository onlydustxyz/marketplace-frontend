import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Callout from "src/components/Callout";
import { WorkItem } from "src/components/GithubIssue";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
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
  CreateIssueDocument,
  CreateIssueMutation,
  CreateIssueMutationVariables,
  GetProjectReposDocument,
  GetProjectReposQuery,
  RepositoryOwnerAndNameFragment,
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

const DEFAULT_WORK_KIND = WORK_KINDS[0];

type Props = {
  projectId: string;
  contributorHandle: string;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function OtherWorkForm({ projectId, contributorHandle, onWorkItemAdded }: Props) {
  const { T } = useIntl();
  const { user: leader } = useAuth();

  const [selectedWorkKind, setSelectedWorkKind] = useState<WorkKind>(DEFAULT_WORK_KIND);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryOwnerAndNameFragment | null>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const defaultTitle = T("payment.form.workItems.other.issue.defaultTitle", {
    kind: T(selectedWorkKind.labelKey),
    author: contributorHandle,
  });

  const { data } = useHasuraQuery<GetProjectReposQuery>(GetProjectReposDocument, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const repos = sortBy(
    data?.projectsByPk?.githubRepos.map(repo => repo.githubRepoDetails),
    "name"
  );

  useEffect(() => {
    if (!selectedRepo) setSelectedRepo(repos[0]);
  }, [selectedRepo, repos]);

  const showToaster = useShowToaster();

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setSelectedWorkKind(DEFAULT_WORK_KIND);
  };

  const [createIssue, { loading }] = useHasuraMutation<CreateIssueMutation>(
    CreateIssueDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: {
        repoOwner: selectedRepo?.owner,
        repoName: selectedRepo?.name,
        title: title || defaultTitle,
        description,
        assignees: [leader?.displayName, contributorHandle],
      } as CreateIssueMutationVariables,
      onCompleted: data => {
        clearForm();
        onWorkItemAdded(data.createIssue);
        showToaster(T("payment.form.workItems.other.success"));
      },
    }
  );

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="font-belwe font-normal text-base text-greyscale-50">
        {T("payment.form.workItems.other.title")}
      </div>
      <Listbox onChange={setSelectedWorkKind} value={selectedWorkKind}>
        <Listbox.Options static as="div" className="flex flex-wrap gap-x-2 gap-y-3">
          {WORK_KINDS.map((workKind, index) => (
            <Listbox.Option
              key={index}
              as="div"
              value={workKind}
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
              {workKind.icon}
              {T(workKind.labelKey)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <input
        value={title}
        placeholder={defaultTitle}
        className={classNames(
          "w-full py-3 px-4",
          "border border-greyscale-50/8 outline-none rounded-xl bg-white/5",
          "font-walsheim font-normal text-base text-greyscale-50 placeholder:text-greyscale-500"
        )}
        onChange={({ target }) => setTitle(target.value)}
      />
      <textarea
        placeholder={T("payment.form.workItems.other.issue.descriptionPlaceholder")}
        className={classNames(
          "w-full py-3 px-4 h-36 resize-none",
          "border border-greyscale-50/8 outline-none rounded-xl bg-white/5",
          "font-walsheim font-normal text-base text-greyscale-50 placeholder:text-greyscale-500",
          "scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
        )}
        value={description}
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
          {selectedRepo && (
            <>
              <div className="font-walsheim font-normal text-sm text-white">
                {T("payment.form.workItems.other.footer.repository")}
              </div>
              <Listbox value={selectedRepo} onChange={setSelectedRepo} disabled={repos.length < 2}>
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
        <Button width={Width.Full} disabled={!selectedWorkKind || !description || loading} onClick={createIssue}>
          <CheckLine />
          {T("payment.form.workItems.other.footer.submitButton")}
        </Button>
      </div>
    </div>
  );
}
