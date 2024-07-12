import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type ProjectResponse = components["schemas"]["ProjectResponse"];

interface ProjectInterface extends ProjectResponse {}

class Project extends mapApiToClass<ProjectResponse>() implements ProjectInterface {
  constructor(readonly props: ProjectResponse) {
    super(props);
  }
}

export { Project };
