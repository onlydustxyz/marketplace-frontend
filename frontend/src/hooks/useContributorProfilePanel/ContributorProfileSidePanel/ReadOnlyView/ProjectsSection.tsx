import { useIntl } from "src/hooks/useIntl";
import { Section } from "./Section";
import ProjectCard, { Project } from "./ProjectCard";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";

type Props = {
  projects: Project[];
  setOpen: (value: boolean) => void;
};

export default function ProjectsSection({ projects, setOpen }: Props) {
  const { T } = useIntl();

  return (
    <Section title={T("profile.sections.projects.title")}>
      <div className="grid grid-cols-3 gap-3">
        {projects.map(project => (
          <Link
            onClick={() => setOpen(false)}
            key={project.id}
            to={generatePath(RoutePaths.ProjectDetails, { projectId: project.id })}
          >
            <ProjectCard {...project} />
          </Link>
        ))}
      </div>
    </Section>
  );
}
