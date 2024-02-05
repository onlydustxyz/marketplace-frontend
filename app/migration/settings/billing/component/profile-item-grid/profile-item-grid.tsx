import { TProfileItemGrid } from "./profile-item-grid.types";

export function ProfileItemGrid({ children }: TProfileItemGrid.Props) {
  return <div className="grid w-full grid-cols-3">{children}</div>;
}
