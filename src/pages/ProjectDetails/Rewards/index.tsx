import { Outlet, useOutletContext } from "react-router-dom";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";

import { Project } from "src/types";

type OutletContext = {
  project: Project;
};

export default function Rewards() {
  const { project } = useOutletContext<OutletContext>();
  const { id: projectId, slug: projectKey } = project;

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    refetch,
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
        refetchBudgets: refetch,
      }}
    />
  );
}
