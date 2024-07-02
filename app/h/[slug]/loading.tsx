import { HeaderLoading } from "app/h/[slug]/components/header/header";
import { IntroLoading } from "app/h/[slug]/features/intro/intro";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export default function LoadingHackathonPage() {
  return (
    <div className={"scrollbar-sm group flex h-full w-full flex-col overflow-y-scroll px-2 outline-none md:px-6"}>
      <div id={"overview"} />
      <div className="pointer-events-none sticky top-0 z-10 w-full">
        <div className="w-full" style={{ height: 310 }}>
          <div className="w-full" style={{ height: 254 }}>
            <HeaderLoading />
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="flex w-full flex-col items-start justify-start gap-6 pb-6 pt-6 md:pt-14">
          <IntroLoading />
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
        <div className="h-[134px] w-full" />
      </div>
    </div>
  );
}
