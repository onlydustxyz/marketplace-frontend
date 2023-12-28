import ProjectCard from "./components/project-card/project-card.tsx";
import Projects from "./_temp-mock.ts";

function ProjectsPage() {
  return (
    <>
      <div>ProjectsPage</div>
      {Projects.map((project, index) => {
        const isFirstHiringProject = index === 0 && project.hiring;

        return <ProjectCard key={index} project={project} isFirstHiringProject={isFirstHiringProject} />;
      })}
    </>
  );
}

export default ProjectsPage;
