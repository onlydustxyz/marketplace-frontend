import { BaseHTMLAttributes } from "react";

import { TCustomIcon } from "./custom-icon.types";
import { RemixIconsName } from "./remix-icon-names.types";

export namespace TIcon {
  type HtmlDiv = BaseHTMLAttributes<HTMLDivElement>;

  interface BaseProps extends HtmlDiv {
    size?: number;
    color?: string;
    className?: string;
  }

  interface CustomProps extends BaseProps {
    customName: TCustomIcon.Names;
    remixName?: never;
  }

  interface RemixProps extends BaseProps {
    remixName: RemixIconsName;
    customName?: never;
  }

  export type Props = CustomProps | RemixProps;
}
