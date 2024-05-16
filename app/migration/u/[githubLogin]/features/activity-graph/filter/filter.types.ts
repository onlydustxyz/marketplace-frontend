export namespace TFilter {
  export interface Props {
    ecosystems: {
      id: string;
      name: string;
      logoUrl: string;
    }[];
    onChange: (value: string | undefined) => void;
    value: string | undefined;
  }
}
