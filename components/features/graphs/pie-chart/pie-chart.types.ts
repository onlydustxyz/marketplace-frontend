export namespace TPieChart {
  interface SingleDataProps {
    id: string | number;
    value: number;
    label?: string;
  }

  export interface Props {
    data: SingleDataProps[];
  }
}
