export namespace TProjectAccordion {
  export interface Props {
    projects: {
      id: string;
      name: string;
      logoUrl: string;
      description: string;
      status: string;
    }[];
  }
}
