import { Flex } from "components/layout/flex/flex";
import ProjectCard from "./components/project-card/project-card.tsx";
import Projects from "./_temp-mock.ts";
import { Filters } from "./components/filters/filters.tsx";
import { AddProject } from "./components/add-project/add-project.tsx";

function ProjectsPage() {
  return (
    <Flex direction="col" className="max-w-7xl gap-6 p-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
      <Flex className="gap-6">
        <div className="sticky top-0 z-10 hidden shrink-0 basis-80 xl:block">
          <AddProject />
          <Filters />
        </div>

        <Flex direction="col" className="min-w-0 grow gap-5">
          {Projects.map((project, index) => {
            const isFirstHiringProject = index === 0 && project.hiring;
            return <ProjectCard key={index} project={project} isFirstHiringProject={isFirstHiringProject} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectsPage;
