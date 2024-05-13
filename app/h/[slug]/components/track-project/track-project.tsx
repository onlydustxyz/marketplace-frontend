import { Project } from "app/h/[slug]/features/project/project";

import { Avatar } from "components/ds/avatar/avatar";
import { Typography } from "components/layout/typography/typography";

import { TTrackProject } from "./track-project.types";

export function TrackProject({ project }: TTrackProject.Props) {
  return (
    <Project slug={project.slug} className="w-full">
      <div className="flex w-full flex-row items-start justify-start gap-3 rounded-2xl border border-card-border-light p-6">
        <Avatar size={"xl"} shape={"square"} src={project.logoUrl} />
        <div className="flex flex-col items-start justify-start gap-1">
          <Typography variant="title-m" className="text-left">
            {project.name}
          </Typography>
          <Typography variant="body-m" className="text-left text-greyscale-200">
            {project.shortDescription}
          </Typography>
        </div>
      </div>
    </Project>
  );
}
