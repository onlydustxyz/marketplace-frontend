import { ComponentProps } from "react";
import { Link, generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";

import ProjectCard from "./ProjectCard";
import { Section } from "./Section";

type Props = {
  projects: ComponentProps<typeof ProjectCard>["project"][];
  setOpen?: () => void;
  event?: (slug: string) => void;
};

export default function ProjectsSection({ projects, setOpen, event }: Props) {
  const { T } = useIntl();

  return (
    <Section title={T("profile.sections.projects.title")}>
      <div className="flex grid-cols-2 flex-col gap-3 md:grid xl:grid-cols-3">
        {projects.map(project =>
          event ? (
            <button onClick={() => event(project.slug)} key={project.id} className="text-left">
              <ProjectCard project={project} />
            </button>
          ) : (
            <Link
              onClick={setOpen}
              key={project.id}
              to={generatePath(RoutePaths.ProjectDetails, { projectKey: project.slug || "" })}
            >
              <ProjectCard project={project} />
            </Link>
          )
        )}
      </div>
    </Section>
  );
}
