import ProjectCard from "./components/project-card/project-card.tsx";
import Projects from "./_temp-mock.ts";

export default function ProjectsPage() {
  return (
    <>
      <div>ProjectsPage</div>
      <div className="flex grow flex-col gap-5">
        {Projects.map((project, index) => {
          const isFirstHiringProject = index === 0 && project.hiring;
          return <ProjectCard key={index} project={project} isFirstHiringProject={isFirstHiringProject} />;
        })}
      </div>
    </>
  );
}
