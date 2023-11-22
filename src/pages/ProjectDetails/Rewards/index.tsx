import { Outlet, useOutletContext } from "react-router-dom";
import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";

type OutletContext = {
  project: components["schemas"]["ProjectResponse"];
};

export default function Rewards() {
  const { project } = useOutletContext<OutletContext>();
  const { id: projectId, slug: projectKey, createdAt } = project;

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    refetch: refetchBudgets,
  } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_PROJECT_BUDGETS,
    pathParam: { projectId },
    method: "GET",
  });

  return (
    <Outlet
      context={{
        isBudgetLoading,
        projectBudget,
        projectId,
        projectKey,
        project,
        refetchBudgets,
        createdAt,
      }}
    />
  );
}
