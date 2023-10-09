import Skeleton from "src/components/Skeleton";

export default function AllProjectLoading() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton variant="header" />
      <Skeleton variant="card" />
    </div>
  );
}
