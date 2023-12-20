import Skeleton from "src/components/Skeleton";

export default function InsightSkeleton() {
  return (
    <div className="relative flex min-h-full flex-col gap-6">
      <Skeleton variant="projectInsightProfilCard" />
      <Skeleton variant="projectInsightTable" />
      <Skeleton variant="projectInsightProfilCard" />
    </div>
  );
}
