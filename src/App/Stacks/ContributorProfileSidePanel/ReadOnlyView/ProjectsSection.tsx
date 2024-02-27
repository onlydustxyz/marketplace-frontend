import { ComponentProps } from "react";

import { useIntl } from "src/hooks/useIntl";

import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

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
            <BaseLink onClick={setOpen} key={project.id} href={NEXT_ROUTER.projects.details.root(project.slug || "")}>
              <ProjectCard project={project} />
            </BaseLink>
          )
        )}
      </div>
    </Section>
  );
}
