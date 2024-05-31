import { TGridWrapper } from "./grid-wrapper.types";

export function GridWrapper({ children }: TGridWrapper.Props) {
  return <div className="grid grid-cols-2 gap-3 py-3 md:grid-cols-4">{children}</div>;
}
