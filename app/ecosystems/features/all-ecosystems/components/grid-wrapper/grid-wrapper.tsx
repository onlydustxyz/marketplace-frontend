import { TGridWrapper } from "./grid-wrapper.types";

export function GridWrapper({ children }: TGridWrapper.Props) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{children}</div>;
}
