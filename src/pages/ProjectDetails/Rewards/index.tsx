import { Outlet, useOutletContext } from "react-router-dom";
import { OutletContext } from "../View";

export default function Rewards() {
  const { project, projectBudget, isBudgetLoading, refetchBudgets } = useOutletContext<OutletContext>();
  const { id: projectId, slug: projectKey, createdAt, repos } = project;

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
        repos,
      }}
    />
  );
}
