export namespace TProjectSelection {
  export interface Props {
    projectId: string;
    onChange: (projectId: string) => void;
    isLoading?: boolean;
  }
}
