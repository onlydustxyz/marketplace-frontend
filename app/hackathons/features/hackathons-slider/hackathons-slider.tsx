import { Slide } from "./components/slide/slide";
import { Slider } from "./components/slider/slider";
import { THackathonsSlider } from "./hackathons-slider.types";

export function HackathonsSlider({ title, icon, items, status }: THackathonsSlider.Props) {
  return (
    <Slider title={title} icon={icon}>
      {items.map((item, key) => (
        <Slide {...item} key={key} index={key} status={status} />
      ))}
    </Slider>
  );
}
