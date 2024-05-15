import { Header } from "app/h/[slug]/components/header/header";
import { Navigation } from "app/h/[slug]/components/navigation/navigation";
import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";
import { Intro } from "app/h/[slug]/features/intro/intro";
import { ScrollableView } from "app/h/[slug]/features/scrollable-view/scrollable-view";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export default function Loading() {
  return (
    <ScrollableView>
      <Header.Loading />
      <Navigation.Loading />
      <Wrapper className="max-md:p-2">
        <div className="flex w-full flex-col items-start justify-start gap-6 pb-6 pt-6 md:pt-14">
          <Intro.Loading />
          <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
            <div className="w-full md:w-[400px]">
              <Flex direction="col" className="gap-6">
                <SkeletonEl width="100%" height="300px" variant="rounded" />
              </Flex>
            </div>
            <div className="flex h-auto w-full flex-1 flex-col items-start justify-start gap-6">
              <SkeletonEl width="100%" height="600px" variant="rounded" />
            </div>
          </div>
        </div>
      </Wrapper>
    </ScrollableView>
  );
}
