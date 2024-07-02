import { zodResolver } from "@hookform/resolvers/zod";
import { applicationsApiClient } from "api-client/resources/applications";
import { issuesApiClient } from "api-client/resources/issues";
import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TApplyIssueDrawer } from "app/p/[slug]/features/apply-issue-drawer/apply-issue-drawer.types";

import ProjectApi from "src/api/Project";
import { FetchError } from "src/api/query.type";
import { HttpStatusStrings } from "src/api/query.utils";
import useMutationAlert from "src/api/useMutationAlert";

import { usePublicRepoScope } from "components/features/grant-permission/hooks/use-public-repo-scope";

import { useIntl } from "hooks/translate/use-translate";

export function useApplyIssueDrawer({ state }: Pick<TApplyIssueDrawer.Props, "state">) {
  const [{ isOpen, issueId, applicationId }, setState] = state;
  const { getPermissions } = usePublicRepoScope({});
  const { slug = "" } = useParams<{ slug: string }>();
  const project = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });
  const { T } = useIntl();

  const { data: issue, ...getIssue } = issuesApiClient.queries.useGetIssueById({
    pathParams: {
      issueId: Number(issueId),
    },
    options: { enabled: Boolean(issueId) && isOpen },
  });

  const { data: application, ...getApplication } = applicationsApiClient.queries.useGetApplicationById({
    pathParams: { applicationId },
    options: { enabled: Boolean(applicationId) && isOpen },
  });

  const { mutateAsync: createAsync, ...createApplication } = meApiClient.mutations.usePostMyApplication({
    projectId: project.data?.id ?? "",
  });

  const { mutateAsync: updateAsync, ...updateApplication } = meApiClient.mutations.useUpdateMyApplication(
    {
      pathParams: {
        applicationId,
      },
    },
    project.data?.id ?? ""
  );

  const { mutateAsync: deleteAsync, ...deleteApplication } = applicationsApiClient.mutations.useDeleteApplication(
    {
      pathParams: {
        applicationId,
      },
    },
    project.data?.id ?? ""
  );

  useMutationAlert({
    mutation: createApplication,
    success: {
      message: T("v2.features.projects.applyIssueDrawer.toaster.createSuccess"),
    },
    error: {
      default: true,
    },
  });

  useMutationAlert({
    mutation: updateApplication,
    success: {
      message: T("v2.features.projects.applyIssueDrawer.toaster.updateSuccess"),
    },
    error: {
      default: true,
    },
  });

  const form = useForm<TApplyIssueDrawer.form>({
    resolver: zodResolver(TApplyIssueDrawer.validation),
    defaultValues: {
      motivations: application?.motivation ?? "",
      problemSolvingApproach: application?.problemSolvingApproach ?? "",
    },
  });

  useEffect(() => {
    if (application) {
      form.reset({
        motivations: application.motivation ?? "",
        problemSolvingApproach: application.problemSolvingApproach ?? "",
      });
    }
  }, [application]);

  async function getPermissionsOnError(err: FetchError) {
    if (err.errorType === HttpStatusStrings.FORBIDDEN) {
      await getPermissions();
    }
  }

  function handleCreate(values: TApplyIssueDrawer.form) {
    if (!project.data?.id || !application?.issue.id) return;

    createAsync({
      projectId: project.data.id,
      issueId: application.issue.id,
      motivation: values.motivations,
      problemSolvingApproach: values.problemSolvingApproach,
    })
      .then(() => {
        setState(prevState => ({ ...prevState, isOpen: false }));
      })
      .catch(async (err: FetchError) => {
        await getPermissionsOnError(err);
      });
  }

  function handleUpdate(values: TApplyIssueDrawer.form) {
    updateAsync({
      motivation: values.motivations,
      problemSolvingApproach: values.problemSolvingApproach,
    })
      .then(() => {
        setState(prevState => ({ ...prevState, isOpen: false }));
      })
      .catch(async (err: FetchError) => {
        await getPermissionsOnError(err);
      });
  }

  function handleCancel() {
    deleteAsync({})
      .then(() => {
        setState(prevState => ({ ...prevState, isOpen: false }));
        setTimeout(() => {
          form.reset();
        }, 500);
      })
      .catch(async (err: FetchError) => {
        await getPermissionsOnError(err);
      });
  }

  return {
    project,
    form,
    issue,
    getIssue,
    application,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication,
    handleCreate,
    handleUpdate,
    handleCancel,
  };
}

export function useApplyIssueDrawerState() {
  return useState({ isOpen: false, issueId: "", applicationId: "" });
}
