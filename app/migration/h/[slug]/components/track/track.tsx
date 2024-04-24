import { TrackAccordion } from "app/migration/h/[slug]/features/track-accordion/track-accordion";
import { TrackProjects } from "app/migration/h/[slug]/features/track-projects/track-projects";

import MarkdownPreview from "src/components/MarkdownPreview";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { TTrack } from "./track.types";

export function Track({ data }: TTrack.Props) {
  return (
    <TrackAccordion title={data.name} subtitle={data.subtitle} icon={{ remixName: data.iconSlug as RemixIconsName }}>
      <div className="border-t-1 border-t-card-border-light px-5 py-6">
        <MarkdownPreview>{data.description}</MarkdownPreview>
      </div>
      {data.projects.length ? (
        <div className="border-t-1 border-t-card-border-light px-5 py-6">
          <TrackProjects projects={data.projects} />
        </div>
      ) : null}
    </TrackAccordion>
  );
}
