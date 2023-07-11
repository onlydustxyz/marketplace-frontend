import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilterProvider } from "./useProjectFilter";
import useScrollRestoration from "./AllProjects/useScrollRestoration";
import { Suspense, useState } from "react";
import Loader from "src/components/Loader";
import SearchBar from "./SearchBar";

export default function Projects() {
  const { ledProjectIds } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ref] = useScrollRestoration();

  return (
    <ProjectFilterProvider>
      <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="flex flex-col gap-6 px-4 pb-8 md:container md:mx-auto md:px-12 xl:pt-16">
          <div>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex h-full gap-6">
            <div className="sticky top-0 hidden shrink-0 basis-80 xl:block">
              <FilterPanel isProjectLeader={!!ledProjectIds.length} />
            </div>
            <div className="min-w-0 grow">
              <Suspense fallback={<Loader />}>
                <AllProjects search={searchQuery} clearSearch={() => setSearchQuery("")} />
              </Suspense>
            </div>
          </div>
        </div>
      </Background>
    </ProjectFilterProvider>
  );
}
