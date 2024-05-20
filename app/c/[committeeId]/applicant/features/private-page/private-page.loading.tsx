import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function PrivatePageLoading() {
  return (
    <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card-background-base max-md:min-h-full md:max-h-full">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div className={"grid gap-8 p-6 md:p-12"}>
        <div className="grid gap-8">
          <SkeletonEl variant={"rounded"} width={"50%"} height={20} />

          <div className="grid gap-2">
            <SkeletonEl variant={"rounded"} width={"33%"} height={32} />
            <SkeletonEl variant={"rounded"} width={"100%"} height={16} />
          </div>

          {/* TODO @hayden */}
          <div>PROJECT SELECT</div>

          <div className={"grid gap-8"}>
            <div className="grid gap-2">
              <SkeletonEl variant={"rounded"} width={"33%"} height={32} />
              <SkeletonEl variant={"rounded"} width={"100%"} height={16} />
            </div>

            {/* TODO @hayden */}
            <div>QUESTIONS</div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-start justify-end border-t border-card-border-light bg-card-background-base p-6 shadow-medium md:relative md:bottom-auto md:left-auto md:flex-row md:items-center xl:rounded-b-2xl">
        <SkeletonEl variant={"rounded"} width={134} height={56} />
      </footer>
    </div>
  );
}
