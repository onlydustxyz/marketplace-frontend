import { SliderLoading } from "app/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider.loading";
import { SectionLoading } from "app/ecosystems/components/section/section.loading";

export async function LanguagesLoading() {
  return (
    <SectionLoading>
      <SliderLoading />
    </SectionLoading>
  );
}
