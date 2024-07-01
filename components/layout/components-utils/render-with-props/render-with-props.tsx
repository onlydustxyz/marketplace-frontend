import { TRenderWithProps } from "./render-with-props.types";

export function RenderWithProps<T>({ Component, props, overrideProps }: TRenderWithProps.Props<T>) {
  if (props) {
    return <Component {...props} {...(overrideProps || {})} />;
  }

  return null;
}
