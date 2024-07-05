export interface ProjectStoragePort {
  save: (project) => void;
  getProjectBySlug: () => void;
}
