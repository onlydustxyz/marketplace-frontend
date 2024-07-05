import { ProjectStoragePort } from "core/domain/ports/output/project-storage.port";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: MarketplaceApiClient) {}

  async getProject(id: string): Promise<Project> {
    const project = await this.client.getProject(id);
    return project;
  }
  async getProjects(): Promise<Project[]> {
    const projects = await this.client.getProjects();
    return projects;
  }
  async createProject(project: Project): Promise<void> {
    await this.client.createProject(project);
  }
  async updateProject(project: Project): Promise<void> {
    await this.client.updateProject(project);
  }
  async deleteProject(id: string): Promise<void> {
    await this.client.deleteProject(id);
  }
}
