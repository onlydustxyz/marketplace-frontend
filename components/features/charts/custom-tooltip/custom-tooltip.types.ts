import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";

export namespace TCustomTooltip {
  export type CustomPayload = Payload<ValueType, NameType>[];

  export interface Props {
    active?: boolean;
    payload?: CustomPayload;
    renderTooltip?: (payload: CustomPayload) => JSX.Element;
  }
}
