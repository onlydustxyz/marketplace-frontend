import { Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";
import { components } from "src/__generated/api";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Loader from "src/components/Loader";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ProjectsSidebar from "./Sidebar";
import { cn } from "src/utils/cn";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { ProjectBudgetType } from "./Rewards/RemainingBudget/RemainingBudget";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

export type OutletContext = {
  project: components["schemas"]["ProjectResponse"];
  projectBudget: ProjectBudgetType;
  isBudgetLoading?: boolean;
  refetchBudgets?: () => void;
};
interface Props {
  project: components["schemas"]["ProjectResponse"];
  padded?: boolean;
  loading: boolean | undefined;
  error: null | unknown;
}

export default function View({ project, padded = true }: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const params = useParams();
  const isProjectLeader = useProjectLeader({ slug: params.projectKey });
  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    refetch: refetchBudgets,
  } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_PROJECT_BUDGETS,
    pathParam: { projectId: project.id },
    method: "GET",
    enabled: isProjectLeader,
  });
  const outletContext = {
    project,
    projectBudget,
    isBudgetLoading,
    refetchBudgets,
  };

  const { id, slug } = project;
  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
      <ProjectsSidebar projectId={id} projectSlug={slug} />
      <Background
        roundedBorders={isXl ? BackgroundRoundedBorders.Right : BackgroundRoundedBorders.Full}
        innerClassName={cn(isXl ? "h-full" : "h-auto")}
      >
        <div
          className={cn("mx-auto flex h-full flex-1 flex-col gap-6", {
            "max-w-7xl gap-6 px-4 py-6 xl:px-8": padded,
          })}
        >
          <Suspense fallback={<Loader />}>
            <Outlet context={outletContext} />
          </Suspense>
        </div>
      </Background>
    </div>
  );
}
