import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import ProjectCard from "./components/project-card/project-card.tsx";
import Projects from "./_temp-mock.ts";

function ProjectsPage() {
  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
        <div className="flex grow flex-col gap-5">
            {Projects.map((project, index) => {
                const isFirstHiringProject = index === 0 && project.hiring;
                return <ProjectCard key={index} project={project} isFirstHiringProject={isFirstHiringProject} />;
            })}
        </div>
    </Flex>
  );
}

export default ProjectsPage;
