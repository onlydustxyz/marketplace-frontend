export namespace TLegend {
  interface SingleDataProps {
    id: string | number;
    value: number;
    label?: string;
    color: string;
  }

  export interface Props {
    data: SingleDataProps[];
    setActiveId: (id: string | number | null) => void;
  }
}
