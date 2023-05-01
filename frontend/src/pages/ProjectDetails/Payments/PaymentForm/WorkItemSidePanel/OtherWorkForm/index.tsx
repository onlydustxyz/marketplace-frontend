import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Button, { Width } from "src/components/Button";
import Callout from "src/components/Callout";
import { WorkItem } from "src/components/GithubIssue";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import CheckLine from "src/icons/CheckLine";
import { HasuraUserRole } from "src/types";
import isDefined from "src/utils/isDefined";
import {
  CreateIssueDocument,
  CreateIssueMutation,
  CreateIssueMutationVariables,
  GetProjectReposDocument,
  GetProjectReposQuery,
  RepositoryOwnerAndNameFragment,
} from "src/__generated/graphql";
import Description from "./Description";
import RepoSelect from "./RepoSelect";
import Title from "./Title";
import WorkKinds, { WORK_KINDS } from "./WorkKinds";
import { issueToWorkItem } from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Issues";

type WorkKind = {
  icon: ReactElement;
  labelKey: string;
};

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
    data?.projectsByPk?.githubRepos.map(repo => repo.githubRepoDetails?.content) || [],
    "name"
  ).filter(isDefined);

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
        projectId: projectId,
        githubRepoId: selectedRepo?.id,
        title: title || defaultTitle,
        description,
        assignees: [leader?.displayName, contributorHandle],
      } as CreateIssueMutationVariables,
      context: { graphqlErrorDisplay: "toaster" },
      onCompleted: data => {
        clearForm();
        onWorkItemAdded(issueToWorkItem(data.createIssue, projectId));
        showToaster(T("payment.form.workItems.other.success"));
      },
    }
  );

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="font-belwe font-normal text-base text-greyscale-50">
        {T("payment.form.workItems.other.title")}
      </div>
      <WorkKinds workKind={selectedWorkKind} setWorkKind={setSelectedWorkKind} />
      <Title title={title} setTitle={setTitle} defaultTitle={defaultTitle} />
      <Description description={description} setDescription={setDescription} />
      <Callout>{T("payment.form.workItems.other.callout")}</Callout>
      <div className="fixed bottom-0 inset-x-0 flex flex-row gap-8 px-6 py-6 bg-white/2 border-t border-greyscale-50/8">
        {selectedRepo ? (
          <RepoSelect repos={repos} repo={selectedRepo} setRepo={setSelectedRepo} />
        ) : (
          <div className="w-full" />
        )}
        <Button width={Width.Full} disabled={!selectedWorkKind || !description || loading} onClick={createIssue}>
          <CheckLine />
          {T("payment.form.workItems.other.footer.submitButton")}
        </Button>
      </div>
    </div>
  );
}
