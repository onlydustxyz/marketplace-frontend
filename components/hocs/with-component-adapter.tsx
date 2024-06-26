import { ComponentType } from "react";

export function withComponentAdapter<P extends object>(Adapter: ComponentType<P>) {
  return function WithComponentAdapter(props: P) {
    return <Adapter {...props} />;
  };
}
