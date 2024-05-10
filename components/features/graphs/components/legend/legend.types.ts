import { TTooltip } from "../tooltip/tooltip.types";

export namespace TLegend {
  interface SingleDataProps {
    id: string | number;
    value: number;
    label: string | number;
    color: string;
  }

  export interface Props {
    data: SingleDataProps[];
    setActiveId: (id: string | number | null) => void;
    renderTooltip?: (data: TTooltip.DataProps) => JSX.Element;
    legendWrapperClassName?: string;
  }
}
