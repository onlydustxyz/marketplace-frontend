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
    <div className="h-full px-6 py-8 pt-24">
      <div className="flex flex-col gap-4">
        <ProjectOverviewHeadersCard project={project} />
        <ProjectOverviewInformations project={project} />
        <ProjectOverviewReposCard project={project} />
      </div>
    </div>
  );
};
