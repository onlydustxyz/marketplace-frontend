import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function CoworkersTableLoading() {
  return (
    <tbody className="mx-4">
      <tr className="my-4 flex flex-row items-center gap-2" key={1}>
        <td className="flex flex-1 flex-row items-center gap-2">
          <SkeletonEl width="26px" height="26px" variant="circular" color="blue" />
          <SkeletonEl width="60%" height="12px" variant="rounded" color="blue" />
        </td>
        <td className="flex-1">
          <SkeletonEl width="50%" height="24px" variant="rounded" color="blue" />
        </td>
        <td className="flex-1">
          <SkeletonEl width="52%" height="12px" variant="rounded" color="blue" />
        </td>
        <td className="flex flex-1 justify-end">
          <SkeletonEl width="42%" height="24px" variant="rounded" color="blue" />
        </td>
      </tr>
      <tr className="my-4 flex flex-row items-center gap-2" key={2}>
        <td className="flex flex-1 flex-row items-center gap-2">
          <SkeletonEl width="26px" height="26px" variant="circular" color="blue" />
          <SkeletonEl width="40%" height="12px" variant="rounded" color="blue" />
          <SkeletonEl width="18px" height="18px" variant="circular" color="blue" />
        </td>
        <td className="flex-1">
          <SkeletonEl width="45%" height="24px" variant="rounded" color="blue" />
        </td>
        <td className="flex-1">
          <SkeletonEl width="60%" height="12px" variant="rounded" color="blue" />
        </td>
        <td className="flex flex-1 justify-end">
          <SkeletonEl width="42%" height="24px" variant="rounded" color="blue" />
        </td>
      </tr>
      <tr className="my-4 flex flex-row items-center gap-2" key={3}>
        <td className="flex flex-1 flex-row items-center gap-2">
          <SkeletonEl width="26px" height="26px" variant="circular" color="blue" />
          <SkeletonEl width="30%" height="12px" variant="rounded" color="blue" />
        </td>
        <td className="flex-1">
          <SkeletonEl width="55%" height="24px" variant="rounded" color="blue" />
        </td>
        <td className="flex-1">
          <SkeletonEl width="55%" height="12px" variant="rounded" color="blue" />
        </td>
        <td className="flex flex-1 justify-end">
          <SkeletonEl width="42%" height="24px" variant="rounded" color="blue" />
        </td>
      </tr>
    </tbody>
  );
}
