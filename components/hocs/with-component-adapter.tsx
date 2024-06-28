import { ComponentType, ForwardedRef } from "react";

export function withComponentAdapter<P extends object, R = unknown>(Adapter: ComponentType<P>) {
  return function WithComponentAdapter(props: P, ref?: ForwardedRef<R>) {
    return <Adapter ref={ref} {...props} />;
  };
}
