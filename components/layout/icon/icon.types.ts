import { BaseHTMLAttributes } from "react";

import { TCustomIcon } from "./custom-icon.types";
import { RemixIconsName } from "./remix-icon-names.types";

export namespace TIcon {
  type HtmlDiv = BaseHTMLAttributes<HTMLDivElement>;

  interface BaseProps extends HtmlDiv {
    size?: number;
    color?: string;
  }

  interface CustomProps extends BaseProps {
    customName: TCustomIcon.Names;
    remixName?: RemixIconsName;
  }

  interface RemixProps extends BaseProps {
    remixName: RemixIconsName;
    customName?: TCustomIcon.Names;
  }

  export type Props = CustomProps | RemixProps;
  export type renderIcon = (props: {
    className?: string;
    color?: string;
    active?: boolean;
    size?: number;
  }) => JSX.Element;
}
