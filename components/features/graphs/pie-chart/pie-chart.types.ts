import { TTooltip } from "../components/tooltip/tooltip.types";

export namespace TPieChart {
  interface SingleDataProps {
    id: string | number;
    value: number;
    label?: string;
    color?: string;
  }

  export interface Props {
    data: SingleDataProps[];
    renderTooltip?: (data: TTooltip.DataProps) => JSX.Element;
  }
}
