import AllProjectLoading from "src/_pages/Projects/AllProjects/AllProjectsLoading";
import Skeleton from "src/components/Skeleton";

export default function ProjectsLoader() {
  return (
    <div className="h-full">
      <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
        <div>
          <Skeleton variant="search" />
        </div>
        <div className="flex h-full gap-6">
          <div className="sticky top-0 z-10 hidden shrink-0 basis-80 xl:block">
            <div className="sticky top-4 flex flex-col gap-4">
              <Skeleton variant="submitProject" />
              <Skeleton variant="filters" />
            </div>
          </div>
          <div className="min-w-0 grow">
            <AllProjectLoading />
          </div>
        </div>
      </div>
    </div>
  );
}
