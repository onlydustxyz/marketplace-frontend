import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type ProjectResponse = components["schemas"]["ProjectResponse"];

export interface IProject extends ProjectResponse {}

export class Project extends mapApiToClass<ProjectResponse>() implements IProject {
  constructor(props: ProjectResponse) {
    super(props);
  }
}
