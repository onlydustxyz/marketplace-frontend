import Skeleton from "src/components/Skeleton";

export default function AllProjectLoading() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton variant="header" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </div>
  );
}
