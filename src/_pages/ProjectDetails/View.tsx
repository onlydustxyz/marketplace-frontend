import { Outlet, useParams } from "react-router-dom";

import { components } from "src/__generated/api";
import ProjectApi from "src/api/Project";
import { FetchError } from "src/api/query.type";
import { useQueriesErrorBehavior } from "src/api/useQueriesError";
import SEO from "src/components/SEO";
import { cn } from "src/utils/cn";

import ProjectsSidebar from "./Sidebar";

export type OutletContext = {
  project: components["schemas"]["ProjectResponse"];
};
interface Props {
  padded?: boolean;
  contentClassName?: string;
}

export default function View({ padded = true, contentClassName }: Props) {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { data, ...restProjectBySlugQueries } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const errorHandlingComponent = useQueriesErrorBehavior({
    queries: {
      error: restProjectBySlugQueries.error as FetchError,
      isError: restProjectBySlugQueries.isError,
      refetch: restProjectBySlugQueries.refetch,
    },
  });

  if (errorHandlingComponent) {
    return errorHandlingComponent;
  }

  return (
    <>
      {data ? <SEO title={`${data?.name} — OnlyDust`} /> : null}
      <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
        <ProjectsSidebar />
        <div
          className={cn(
            "scrollbar-sm mx-auto flex h-full flex-1 flex-col gap-6",
            {
              "max-w-7xl gap-6 px-4 py-6 xl:px-8": padded,
            },
            contentClassName
          )}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
