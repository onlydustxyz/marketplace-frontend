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
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  projectId: string;
  contributorHandle: string;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function OtherWorkForm({ projectId, contributorHandle, onWorkItemAdded }: Props) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
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

  const repos = sortBy(data?.projects[0]?.githubRepos.map(repo => repo.repo) || [], "name").filter(isDefined);

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
      <form className="flex h-full min-h-0 flex-col justify-between xl:gap-4" onSubmit={onSubmit}>
        <div className="flex min-h-0 flex-col justify-start gap-4 overflow-y-auto px-6 pb-4 scrollbar-thin scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded scrollbar-w-2 xl:pb-0">
          <div className="font-belwe text-base font-normal text-greyscale-50">
            {T("payment.form.workItems.other.title")}
          </div>
          <FormSelect name="workKind" options={workKinds} control={control} />
          <Title title={title} setTitle={setTitle} defaultTitle={defaultTitle} />
          <Description description={description} setDescription={setDescription} />
          <Callout>{T("payment.form.workItems.other.callout")}</Callout>
        </div>
        <div className="flex flex-row justify-between gap-8 border-t border-greyscale-50/8 bg-white/2 p-4 xl:grow-0 xl:px-6 xl:py-8">
          {selectedRepo ? (
            <RepoSelect repos={repos} repo={selectedRepo} setRepo={setSelectedRepo} />
          ) : (
            <div className="w-full" />
          )}
          <Button
            width={isXl ? Width.Full : Width.Fit}
            disabled={!workKind || !description || loading}
            htmlType="submit"
          >
            {isXl && <CheckLine />}
            {isXl
              ? T("payment.form.workItems.other.footer.submitButton")
              : T("payment.form.workItems.other.footer.submitButtonShort")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
