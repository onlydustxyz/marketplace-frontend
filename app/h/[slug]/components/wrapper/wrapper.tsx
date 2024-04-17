import { TWrapper } from "./wrapper.types";

export function Wrapper({ children }: TWrapper.Props) {
  return <div className="w-full px-6 md:px-16 xl:px-28">{children}</div>;
}
