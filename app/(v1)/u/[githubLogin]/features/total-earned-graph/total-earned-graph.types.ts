export namespace TTotalEarnedGraph {
  export interface Props {
    githubUserId: number;
  }

  export interface PropsClient {
    data: {
      label: string;
      value: number;
      id: string;
    }[];
  }
}
