import { PropsWithChildren } from "react";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

export namespace TCustomTooltip {
  export interface Props extends PropsWithChildren {
    active?: boolean;
    payload?: Payload<string, number>[];
  }
}
