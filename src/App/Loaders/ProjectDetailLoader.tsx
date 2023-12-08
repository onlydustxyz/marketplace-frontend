import Skeleton from "src/components/Skeleton";

export default function ProjectDetailsLoader() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
      <div className="flex w-full shrink-0 flex-col gap-6 bg-white/4 bg-noise-medium p-6 font-walsheim xl:w-80 xl:rounded-l-2xl">
        <Skeleton variant="projectSidebar" />
      </div>
      <div className="h-full w-full overflow-y-auto bg-space bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:rounded-r-3xl">
        <div className="h-full">
          <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 xl:px-8">
            <Skeleton variant="projectOverview" />
          </div>
        </div>
      </div>
    </div>
  );
}
