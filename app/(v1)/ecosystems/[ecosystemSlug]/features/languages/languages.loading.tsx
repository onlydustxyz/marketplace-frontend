import { SliderLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider.loading";

import { SectionLoading } from "components/layout/section/section.loading";

export async function LanguagesLoading() {
  return (
    <SectionLoading>
      <SliderLoading />
    </SectionLoading>
  );
}
