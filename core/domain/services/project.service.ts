import { GithubOrganization } from "core/domain/models/github-organization";
import { ProjectFacadePort } from "core/domain/ports/input/project-facade.port";
import { ProjectStoragePort } from "core/domain/ports/output/project-storage.port";

export class ProjectService implements ProjectFacadePort {
  constructor(projectStoragePort: ProjectStoragePort) {
    this.projectStoragePort = projectStoragePort;
  }

  createProject() {
    const list = [new GithubOrganization({})];
    const installedOrgs = list.filter(org => org.isInstalled);

    this.projectStoragePort.save(installedOrgs);
  }

  getProjectBySlug() {
    this.projectStoragePort.getProjectBySlug();
  }
}
