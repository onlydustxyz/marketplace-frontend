import { components } from "src/__generated/api";

import { ShortProject, ShortProjectInterface } from "./short-project-model";

type ProjectResponse = components["schemas"]["ProjectResponse"];

interface ProjectInterface extends ProjectResponse, ShortProjectInterface {}

export class Project extends ShortProject implements ProjectInterface {
  constructor(readonly props: ProjectResponse) {
    super(props);
    Object.assign(this, props);
  }
}
