import ProjectApi from "src/api/Project";
import { ProjectOverviewHeadersCard } from "./components/Header";
import { ProjectOverviewInformations } from "./components/Informations";
import { ProjectOverviewReposCard } from "./components/Repos";

type Props = {
  slug: string;
};

export const ProjectOverviewSidePanel = ({ slug }: Props) => {
  const { data: project, isLoading } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  // TODO SKELLETON / LOADING

  if (!project) {
    return null;
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <div className="pointer-events-none h-20 w-full bg-greyscale-900" />
      <div className="flex h-0 flex-auto flex-col gap-3 overflow-auto p-px px-6 pb-6  scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <div className="flex flex-col gap-4">
          <ProjectOverviewHeadersCard project={project} />
          <ProjectOverviewInformations project={project} />
          <ProjectOverviewReposCard project={project} />
        </div>
      </div>
    </div>
  );
};
