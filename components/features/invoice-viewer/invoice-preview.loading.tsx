import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function InvoicePreviewLoading() {
  return (
    <div className="flex w-full flex-col gap-12 p-8">
      <div className="flex flex-col items-center gap-1">
        <SkeletonEl width="50%" height="16px" variant="text" color="grey" />
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-2" />
          <SkeletonEl width="50%" height="8px" variant="text" color="grey" />
          <SkeletonEl width="30%" height="8px" variant="text" color="grey" />
          <SkeletonEl width="20%" height="8px" variant="text" color="grey" />
        </div>
        <div className="flex flex-1 flex-col items-end gap-1">
          <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-2" />
          <SkeletonEl width="50%" height="8px" variant="text" color="grey" />
          <SkeletonEl width="30%" height="8px" variant="text" color="grey" />
          <SkeletonEl width="20%" height="8px" variant="text" color="grey" />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-2" />
          <SkeletonEl width="20%" height="8px" variant="text" color="grey" />
        </div>
        <div className="flex flex-1 flex-col items-end gap-1">
          <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-2" />
          <SkeletonEl width="20%" height="8px" variant="text" color="grey" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-2" />
        <SkeletonEl width="70%" height="8px" variant="text" color="grey" />
        <SkeletonEl width="60%" height="8px" variant="text" color="grey" />
      </div>
      <div className="flex flex-col gap-1">
        <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-4" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-between">
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
          </div>
          <div className="flex flex-row justify-between">
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
          </div>
          <div className="flex flex-row justify-between">
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
          </div>
          <div className="flex flex-row justify-between">
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
          </div>
          <div className="flex flex-row justify-between">
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="24.5%" height="8px" variant="rectangular" color="grey" className="p-4" />
          </div>
          <div className="flex flex-row justify-between">
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
            <SkeletonEl width="25%" height="8px" variant="rectangular" color="grey" className="p-4" />
          </div>
        </div>
        <SkeletonEl width="75%" height="8px" variant="text" color="grey" className="mt-4" />
      </div>
      <div className="flex flex-col gap-1">
        <SkeletonEl width="40%" height="12px" variant="text" color="grey" className="mb-2" />
        <SkeletonEl width="70%" height="8px" variant="text" color="grey" />
        <SkeletonEl width="20%" height="8px" variant="text" color="grey" />
        <SkeletonEl width="60%" height="8px" variant="text" color="grey" />
        <SkeletonEl width="40%" height="8px" variant="text" color="grey" />
      </div>
    </div>
  );
}
