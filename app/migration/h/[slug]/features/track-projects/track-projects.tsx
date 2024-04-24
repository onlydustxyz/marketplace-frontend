import { TrackProject } from "app/migration/h/[slug]/components/track-project/track-project";
import { TrackShowMoreProject } from "app/migration/h/[slug]/features/track-show-more-project/track-show-more-project";

import { TTrackProjects } from "./track-projects.types";

export function TrackProjects({ projects }: TTrackProjects.Props) {
  const showedProjects = projects.slice(0, 2);
  const moreProjects = projects.slice(2);
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      {showedProjects.map(project => (
        <TrackProject project={project} key={project.name} />
      ))}
      <TrackShowMoreProject projects={moreProjects} />
    </div>
  );
}
