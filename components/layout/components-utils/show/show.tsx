import { TShow } from "./show.types";

export function Show({ children, show }: TShow.Props) {
  if (!show) return null;

  return <>{children}</>;
}
