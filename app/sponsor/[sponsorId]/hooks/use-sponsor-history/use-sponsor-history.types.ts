export namespace TUseSponsorHistory {
  export interface Props {
    queryParams: {
      fromDate?: string;
      toDate?: string;
      currencies?: string;
      projects?: string;
      types?: string;
      sort?: string;
      direction?: "ASC" | "DESC";
    };
  }
}
