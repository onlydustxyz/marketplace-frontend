import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { projectsApiClient } from "api-client/resources/projects";

import ProjectsPageClient from "app/(projects)/page.client";

import { ProjectsContextProvider } from "./context/project.context";

async function ProjectsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [projectsApiClient.tags.root],
    queryFn: () => projectsApiClient.fetch.getProjectsList({ pageIndex: 0, pageSize: 15 }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsContextProvider>
        <div className="relative z-[1] h-full w-full overflow-y-auto bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:rounded-3xl">
          <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12 ">
            <ProjectsPageClient />
          </div>
        </div>
      </ProjectsContextProvider>
    </HydrationBoundary>
  );
}

export default ProjectsPage;
