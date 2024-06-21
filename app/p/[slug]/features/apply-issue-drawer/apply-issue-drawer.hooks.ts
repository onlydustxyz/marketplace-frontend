import { zodResolver } from "@hookform/resolvers/zod";
import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TApplyIssueDrawer } from "app/p/[slug]/features/apply-issue-drawer/apply-issue-drawer.types";

import ProjectApi from "src/api/Project";
import useMutationAlert from "src/api/useMutationAlert";

import { useIntl } from "hooks/translate/use-translate";

export function useApplyIssueDrawer({ issue, state }: Pick<TApplyIssueDrawer.Props, "issue" | "state">) {
  const [, setIsOpen] = state;

  const { slug = "" } = useParams<{ slug: string }>();
  const project = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const { mutateAsync, ...restMutation } = meApiClient.mutations.usePostMyApplication({
    projectId: project.data?.id ?? "",
  });

  const { T } = useIntl();
  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("v2.features.projects.applyIssueDrawer.toaster.success"),
    },
    error: {
      default: true,
    },
  });

  const form = useForm<TApplyIssueDrawer.form>({
    resolver: zodResolver(TApplyIssueDrawer.validation),
    defaultValues: { motivations: "", problemSolvingApproach: "" },
  });

  function handleFormSubmission(values: TApplyIssueDrawer.form) {
    mutateAsync({
      projectId: project.data?.id ?? "",
      issueId: issue.id,
      motivation: values.motivations,
      problemSolvingApproach: values.problemSolvingApproach,
    }).then(() => {
      setIsOpen(false);
    });
  }

  function handleCancel() {
    // TODO @hayden
    alert("Cancel!");
  }

  return {
    project,
    form,
    post: restMutation,
    handleFormSubmission,
    handleCancel,
  };
}

export function useApplyIssueDrawerState() {
  return useState(false);
}
