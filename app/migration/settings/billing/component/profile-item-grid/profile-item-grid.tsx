import { TProfileItemGrid } from "./profile-item-grid.types";

export function ProfileItemGrid({ children }: TProfileItemGrid.Props) {
  return <div className="grd grid w-full grid-cols-3 gap-x-2 gap-y-8">{children}</div>;
}
