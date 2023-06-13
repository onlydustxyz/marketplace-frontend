import { sortBy } from "lodash";
import { FormEventHandler, useEffect, useState } from "react";
import Button, { Width } from "src/components/Button";
import Callout from "src/components/Callout";
import { WorkItem } from "src/components/GithubIssue";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import CheckLine from "src/icons/CheckLine";
import isDefined from "src/utils/isDefined";
import {
  CreateIssueMutationVariables,
  GithubRepoFragment,
  useCreateIssueMutation,
  useGetProjectReposQuery,
} from "src/__generated/graphql";
import Description from "./Description";
import RepoSelect from "./RepoSelect";
import Title from "./Title";
import { issueToWorkItem } from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Issues";
import DraftLine from "src/icons/DraftLine";
import TeamLine from "src/icons/TeamLine";
import ExchangeDollarLine from "src/icons/ExchangeDollarLine";
import MoreLine from "src/icons/MoreLine";
import FormSelect from "src/components/FormSelect";
import { FormProvider, useForm } from "react-hook-form";
import { OtherWork } from "./types";

type Props = {
  projectId: string;
  contributorHandle: string;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function OtherWorkForm({ projectId, contributorHandle, onWorkItemAdded }: Props) {
  const { T } = useIntl();
  const { user: leader } = useAuth();

  const workKinds = [
    { icon: <DraftLine />, label: T("payment.form.workItems.other.kinds.documentation") },
    { icon: <TeamLine />, label: T("payment.form.workItems.other.kinds.meeting") },
    { icon: <ExchangeDollarLine />, label: T("payment.form.workItems.other.kinds.subscription") },
    { icon: <MoreLine />, label: T("payment.form.workItems.other.kinds.other") },
  ];
  const defaultWorkKind = workKinds[0].label;

  const [selectedRepo, setSelectedRepo] = useState<GithubRepoFragment | null>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const formMethods = useForm<OtherWork>({
    defaultValues: {
      workKind: defaultWorkKind,
    },
  });

  const { watch, setValue, control, handleSubmit } = formMethods;
  const workKind = watch("workKind");

  const defaultTitle = T("payment.form.workItems.other.issue.defaultTitle", {
    kind: workKind,
    author: contributorHandle,
  });

  const { data } = useGetProjectReposQuery({
    variables: { projectId },
  });

  const repos = sortBy(data?.projectsByPk?.githubRepos.map(repo => repo.repo) || [], "name").filter(isDefined);

  useEffect(() => {
    if (!selectedRepo) setSelectedRepo(repos[0]);
  }, [selectedRepo, repos]);

  const showToaster = useShowToaster();

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setValue("workKind", defaultWorkKind);
  };

  const [createIssue, { loading }] = useCreateIssueMutation({
    variables: {
      projectId: projectId,
      githubRepoId: selectedRepo?.id,
      title: title || defaultTitle,
      description,
      assignees: [leader?.login, contributorHandle],
    } as CreateIssueMutationVariables,
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: data => {
      clearForm();
      onWorkItemAdded(issueToWorkItem(data.createIssue, projectId));
      showToaster(T("payment.form.workItems.other.success"));
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    handleSubmit(() => createIssue())(e);
    e.stopPropagation();
  };

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col justify-between h-full gap-4 min-h-0" onSubmit={onSubmit}>
        <div className="flex flex-col justify-start gap-4 overflow-y-auto min-h-0 px-6 scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
          <div className="font-belwe font-normal text-base text-greyscale-50">
            {T("payment.form.workItems.other.title")}
          </div>
          <FormSelect name="workKind" options={workKinds} control={control} />
          <Title title={title} setTitle={setTitle} defaultTitle={defaultTitle} />
          <Description description={description} setDescription={setDescription} />
          <Callout>{T("payment.form.workItems.other.callout")}</Callout>
        </div>
        <div className="flex flex-row grow-0 gap-8 bg-white/2 border-t border-greyscale-50/8 px-6 py-8">
          {selectedRepo ? (
            <RepoSelect repos={repos} repo={selectedRepo} setRepo={setSelectedRepo} />
          ) : (
            <div className="w-full" />
          )}
          <Button width={Width.Full} disabled={!workKind || !description || loading} htmlType="submit">
            <CheckLine />
            {T("payment.form.workItems.other.footer.submitButton")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
