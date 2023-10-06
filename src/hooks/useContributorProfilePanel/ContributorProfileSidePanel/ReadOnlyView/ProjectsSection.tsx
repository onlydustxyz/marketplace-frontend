import { useIntl } from "src/hooks/useIntl";
import { Section } from "./Section";
import ProjectCard, { Project } from "./ProjectCard";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/components/App";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config";

type Props = {
  projects: Project[];
  setOpen: (value: boolean) => void;
};

export default function ProjectsSection({ projects, setOpen }: Props) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  return (
    <Section title={T("profile.sections.projects.title")}>
      <div className="flex grid-cols-2 flex-col gap-3 md:grid xl:grid-cols-3">
        {projects.map(project =>
          isXl ? (
            <Link
              onClick={() => setOpen(false)}
              key={project.id}
              to={generatePath(RoutePaths.ProjectDetails, { projectKey: project.key })}
            >
              <ProjectCard project={project} />
            </Link>
          ) : (
            <ProjectCard project={project} key={project.id} />
          )
        )}
      </div>
    </Section>
  );
}
