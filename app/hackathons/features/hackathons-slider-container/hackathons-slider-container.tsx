import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { Translate } from "components/layout/translate/translate";

import { Slider } from "./components/slider/slider";
import { THackathonsSliderContainer } from "./hackathons-slider.container.types";

export function HackathonsSliderContainer({ title, icon, items }: THackathonsSliderContainer.Props) {
  return (
    <Slider title={title} icon={icon}>
      {items.map(item => (
        <HackathonCard
          classNames={{ base: "w-full block h-full" }}
          key={item.slug}
          title={item.title}
          slug={item.slug}
          backgroundImage={item.backgroundImage}
          location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
          status={item.getStatus()}
          projects={item.projects}
          dates={item.formatDisplayDates()}
        />
      ))}
    </Slider>
  );
}
