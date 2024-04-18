import { TrackAccordion } from "app/h/[slug]/clients/track-accordion/track-accordion";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { TTrack } from "./track.types";

export function Track({ data }: TTrack.Props) {
  return (
    <TrackAccordion title={data.name} subtitle={data.subtitle} icon={{ remixName: data.iconSlug as RemixIconsName }}>
      <div>cocou</div>
    </TrackAccordion>
  );
}
