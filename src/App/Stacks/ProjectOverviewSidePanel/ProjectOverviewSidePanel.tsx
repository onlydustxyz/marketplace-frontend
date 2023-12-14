import ProjectApi from "src/api/Project";
import { ProjectOverviewHeadersCard } from "./components/Header";
import { ProjectOverviewInformations } from "./components/Informations";
import { ProjectOverviewReposCard } from "./components/Repos";
import MarkdownPreview from "src/components/MarkdownPreview";

type Props = {
  slug: string;
};

export const ProjectOverviewSidePanel = ({ slug }: Props) => {
  const { data: project, isLoading } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const v = true;

  // TODO SKELLETON / LOADING

  if (!project) {
    return null;
  }

  if (!v) {
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
  }
  //   7bc85b13
  // 82800b28
  // a18418ae

  return (
    <div className="h-full overflow-hidden px-6 py-8 pt-12 lg:pt-0">
      <ProjectOverviewHeadersCard project={project} />
      <div className="flex h-full flex-auto flex-col gap-3 overflow-auto p-px pb-6 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <div className="flex flex-col gap-4">
          {project.longDescription && (
            <div className="flex flex-col gap-4 rounded-2xl border border-card-border-light  bg-greyscale-900 px-6 py-4 shadow-medium">
              <MarkdownPreview className="text-sm">{project.longDescription}</MarkdownPreview>
            </div>
          )}
          <ProjectOverviewInformations project={project} />
          <ProjectOverviewReposCard project={project} />
        </div>
      </div>
    </div>
  );
};
