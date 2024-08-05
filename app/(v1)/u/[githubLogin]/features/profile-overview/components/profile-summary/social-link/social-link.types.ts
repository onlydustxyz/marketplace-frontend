import { PropsWithChildren } from "react";

export namespace TSocialLink {
  interface BaseProps extends PropsWithChildren {}

  interface LinkProps extends BaseProps {
    link?: string;
    copyableValue?: never;
    copyableValueName?: never;
  }

  interface CopyableProps extends BaseProps {
    link?: never;
    copyableValue?: string;
    copyableValueName?: string;
  }

  export type Props = LinkProps | CopyableProps;
}
