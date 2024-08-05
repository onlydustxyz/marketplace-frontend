import { TProfileItemGrid } from "./profile-item-grid.types";

export function ProfileItemGrid({ children }: TProfileItemGrid.Props) {
  return <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8 xl:grid-cols-3">{children}</div>;
}
