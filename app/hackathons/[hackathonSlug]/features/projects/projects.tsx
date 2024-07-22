"use client";

import { ShortProject } from "core/domain/project/models/short-project-model";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";
import { CardProject } from "components/molecules/cards/card-project";

import { TProjects } from "./projects.types";

export function Projects({ projects }: TProjects.Props) {
  const {
    project: { open },
  } = useContext(HackathonContext);

  if (!projects.length) return null;

  const projectsList = projects.map(project => new ShortProject(project));

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
        {projectsList.map(project => (
          <li key={project.id}>
            <CardProject
              as="a"
              classNames={{
                base: "h-full",
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
                onClick: () => open(project.id),
              }}
            />
          </li>
        ))}
      </ul>
    </Paper>
  );
}
