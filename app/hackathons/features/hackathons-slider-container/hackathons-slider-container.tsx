import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { Translate } from "components/layout/translate/translate";

import { Slider } from "./components/slider/slider";
import { THackathonsSliderContainer } from "./hackathons-slider.container.types";

export function HackathonsSliderContainer({ title, icon, items, status }: THackathonsSliderContainer.Props) {
  return (
    <Slider title={title} icon={icon}>
      {items.map(item => (
        <HackathonCard
          classNames={{ base: "w-full block h-full" }}
          key={item.slug}
          title={item.title}
          slug={item.slug}
          backgroundImage={getHackathonBackground(item.index)}
          location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
          startDate={new Date(item.startDate)}
          endDate={new Date(item.endDate)}
          status={status}
          projects={item.projects}
        />
      ))}
    </Slider>
  );
}
