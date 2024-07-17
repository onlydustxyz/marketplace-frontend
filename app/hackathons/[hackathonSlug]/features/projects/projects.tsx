import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";
import { CardProject } from "components/molecules/cards/card-project";

import { NEXT_ROUTER } from "constants/router";

import { TProjects } from "./projects.types";

export function Projects({ projects }: TProjects.Props) {
  return (
    <Paper
      size="m"
      container="4"
      classNames={{
        base: "flex flex-col gap-2",
      }}
    >
      <Typo
        variant="brand"
        size="xl"
        translate={{
          token: "v2.pages.hackathons.details.projects.title",
        }}
      />

      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {projects.map(project => (
          <li key={project.id}>
            <CardProject
              as="a"
              htmlProps={{
                href: NEXT_ROUTER.projects.details.root(project.slug),
              }}
              avatarProps={{
                shape: "square",
                size: "xxl",
                src: project.logoUrl,
              }}
              title={project.name}
              description={project.shortDescription}
              bottomTags={project.languages.map(language => ({
                children: language.name,
              }))}
              maxBottomTags={1}
              primaryActionProps={{
                children: <Translate token="v2.pages.hackathons.details.projects.button" />,
              }}
            />
          </li>
        ))}
      </ul>
    </Paper>
  );
}
