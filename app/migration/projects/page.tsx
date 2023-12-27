import ProjectCard from "./components/project-card/project-card.tsx";
import projects from "./_temp-mock.json";
import { isUserProjectLead } from "../../../src/utils/isUserProjectLead.ts";

function ProjectsPage() {
  console.log(projects);
  const githubUserId = 123;
  return (
    <>
      <div>ProjectsPage</div>
      {projects.map((project, index) => {
        const isFirstHiringProject = index === 0 && project.hiring;
        const isLeader = isUserProjectLead(project, githubUserId);

        return <ProjectCard project={project} />;
      })}
    </>
  );
}

export default ProjectsPage;
