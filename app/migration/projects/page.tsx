import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import ProjectItemWrapper from "./components/project-item-wrapper/project-item-wrapper";
import Projects from "./_temp-mock.ts";

function ProjectsPage() {
  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
      <div className="flex grow flex-col gap-5">
        {Projects.map((project, index) => {
          const isFirstHiringProject = index === 0 && project.hiring;
          return <ProjectItemWrapper key={index} project={project} isFirstHiringProject={isFirstHiringProject} />;
        })}
      </div>
    </Flex>
  );
}

export default ProjectsPage;
