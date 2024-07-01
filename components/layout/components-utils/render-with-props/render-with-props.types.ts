import { ReactNode } from "react";

export namespace TRenderWithProps {
  export interface Props<T> {
    Component: (props: T) => ReactNode;
    props?: T;
    overrideProps?: Partial<T>;
    defaultPropsPriority?: boolean;
  }
}
