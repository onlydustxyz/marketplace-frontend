import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import { FirstParameter } from "core/helpers/types";

export class ProjectClientAdapterMock implements ProjectStoragePort {
  constructor() {}

  routes = {};

  getProjectBySlug = (_: FirstParameter<ProjectStoragePort["getProjectBySlug"]>) => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<ProjectStoragePort["getProjectBySlug"]>;
  };

  getProjectRewards = (_: FirstParameter<ProjectStoragePort["getProjectRewards"]>) => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<ProjectStoragePort["getProjectRewards"]>;
  };

  getProjectPublicIssues = (_: FirstParameter<ProjectStoragePort["getProjectPublicIssues"]>) => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<ProjectStoragePort["getProjectPublicIssues"]>;
  };
}
