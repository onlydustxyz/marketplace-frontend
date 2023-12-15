import SkeletonEl from "../New/Skeleton/Skeleton";

export default function SkeletonProjectOverviewPanel() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 px-6">
      <div className="flex w-full flex-row items-start justify-between gap-2">
        <div className="flex w-full flex-row items-center justify-start gap-4">
          <SkeletonEl variant="rounded" color="grey" width={80} height={80} />
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <SkeletonEl variant="rounded" color="grey" width="80%" height={32} radius={8} />
            <SkeletonEl variant="circular" color="grey" width="30%" height={26} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <SkeletonEl variant="rounded" color="grey" width={170} height={32} />
          <SkeletonEl variant="rounded" color="grey" width={32} height={32} radius={12} />
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-4">
        <SkeletonEl variant="rounded" color="grey" width="100%" height={64} />
        <SkeletonEl variant="rounded" color="grey" width="100%" height={250} />
        <SkeletonEl variant="rounded" color="grey" width="100%" height={400} />
      </div>
    </div>
  );
}
