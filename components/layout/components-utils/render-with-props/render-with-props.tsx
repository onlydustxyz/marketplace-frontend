import { TRenderWithProps } from "./render-with-props.types";

export function RenderWithProps<T>({
  Component,
  props,
  overrideProps,
  defaultPropsPriority,
}: TRenderWithProps.Props<T>) {
  if (props) {
    if (defaultPropsPriority) {
      return <Component {...(overrideProps || {})} {...props} />;
    }
    return <Component {...props} {...(overrideProps || {})} />;
  }

  return null;
}
