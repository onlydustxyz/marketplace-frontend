import { ComponentProps } from "react";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { useMediaQuery } from "usehooks-ts";
import ProjectCard from "./ProjectCard";
import { Section } from "./Section";

type Props = {
  projects: ComponentProps<typeof ProjectCard>["project"][];
  setOpen?: (value: boolean) => void;
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
              onClick={() => setOpen?.(false)}
              key={project.id}
              to={generatePath(RoutePaths.ProjectDetails, { projectKey: project.slug || "" })}
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
