import { Outlet, useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import Skeleton from "src/components/Skeleton";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

export default function Rewards() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
    refetch: refetchBudgets,
  } = ProjectApi.queries.useProjectBudget({
    params: { projectId: project?.id },
  });

  if (isBudgetError) {
    showToaster(T("reward.budgets.error"), { isError: true });
  }

  if (isLoadingProject) return <Skeleton variant="projectRewards" />;

  return (
    <Outlet
      context={{
        isBudgetLoading,
        projectBudget,
        projectId: project?.id,
        projectKey,
        project,
        refetchBudgets,
        createdAt: project?.createdAt,
        repos: project?.repos,
      }}
    />
  );
}
