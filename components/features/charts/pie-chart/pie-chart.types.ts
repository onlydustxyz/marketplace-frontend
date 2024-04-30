import { TCustomTooltip } from "../custom-tooltip/custom-tooltip.types";

export namespace TPieChart {
  interface DataProps {
    name: string;
    value: number;
    color?: string;
  }

  export interface Props {
    data: DataProps[];
    renderTooltip?: (payload: TCustomTooltip.CustomPayload) => JSX.Element;
  }
}
