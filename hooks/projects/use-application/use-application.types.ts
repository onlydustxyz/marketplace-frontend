export namespace TUseApplication {
  export interface Props {
    projectId: string;
    projectSlug: string;
  }
  export interface Return {
    alreadyApplied: boolean;
    applyToProject: () => void;
  }
}
