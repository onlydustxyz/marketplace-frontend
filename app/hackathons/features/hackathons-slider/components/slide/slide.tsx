import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { Translate } from "components/layout/translate/translate";

import { TSlide } from "./slide.types";

export function Slide(props: TSlide.Props) {
  return (
    <HackathonCard
      classNames={{ base: "w-full block h-full" }}
      key={props.slug}
      title={props.title}
      slug={props.slug}
      backgroundImage={getHackathonBackground(props.index, 2)}
      location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
      startDate={new Date(props.startDate)}
      status={props.status}
      projects={props.projects}
    />
  );
}
