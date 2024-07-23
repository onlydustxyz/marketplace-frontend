import { zodResolver } from "@hookform/resolvers/zod";
import { applicationsApiClient } from "api-client/resources/applications";
import { issuesApiClient } from "api-client/resources/issues";
import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ProjectApi from "src/api/Project";
import { FetchError } from "src/api/query.type";
import { HttpStatusStrings } from "src/api/query.utils";
import useMutationAlert from "src/api/useMutationAlert";

import { TApplyIssueDrawer } from "components/features/apply-issue-drawer/apply-issue-drawer.types";
import { usePublicRepoScope } from "components/features/grant-permission/hooks/use-public-repo-scope";

import { useIntl } from "hooks/translate/use-translate";

export function useApplyIssueDrawer({ state }: Pick<TApplyIssueDrawer.Props, "state">) {
  const { T } = useIntl();
  const [{ isOpen, issueId, applicationId = "", projectId }, setState] = state;
  const { getPermissions } = usePublicRepoScope({});
  const { slug = "" } = useParams<{ slug: string }>();
  const project = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const currentProjectId = project.data?.id ?? projectId;

  const { data: issue, ...getIssue } = issuesApiClient.queries.useGetIssueById({
    pathParams: {
      issueId: issueId ?? 0,
    },
    options: { enabled: Boolean(issueId) && isOpen },
  });

  const { data: application, ...getApplication } = applicationsApiClient.queries.useGetApplicationById({
    pathParams: { applicationId },
    options: { enabled: Boolean(applicationId) && isOpen },
  });

  const { mutateAsync: createAsync, ...createApplication } = meApiClient.mutations.usePostMyApplication({
    projectId: currentProjectId ?? "",
  });

  const { mutateAsync: updateAsync, ...updateApplication } = meApiClient.mutations.useUpdateMyApplication(
    {
      pathParams: {
        applicationId,
      },
    },
    currentProjectId ?? ""
  );

  const { mutateAsync: deleteAsync, ...deleteApplication } = applicationsApiClient.mutations.useDeleteApplication(
    {
      pathParams: {
        applicationId,
      },
    },
    currentProjectId ?? ""
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
    if (!currentProjectId || !issueId) return;

    createAsync({
      projectId: currentProjectId,
      issueId,
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
  return useState<{ isOpen: boolean; issueId?: number; applicationId?: string; projectId?: string }>({
    isOpen: false,
  });
}
