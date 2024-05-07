export namespace TTooltip {
  export interface DataProps {
    id: string | number;
    value: number;
    label: string | number;
    color: string;
  }

  export interface Props {
    data: DataProps;
    renderTooltip?: (data: DataProps) => JSX.Element;
  }
}
