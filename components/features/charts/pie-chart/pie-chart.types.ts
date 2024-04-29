export namespace TPieChart {
  interface DataProps {
    name: string;
    value: number;
    color?: string;
  }

  export interface Props {
    data: DataProps[];
  }
}
