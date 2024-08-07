import { LinkProject } from "core/domain/project/models/link-project-model";

import { components } from "src/__generated/api";

export type ProjectShortResponse = components["schemas"]["ProjectShortResponse"];

export interface ShortProjectInterface extends LinkProject, ProjectShortResponse {}

export class ShortProject extends LinkProject implements ShortProjectInterface {
  languages!: ProjectShortResponse["languages"];
  shortDescription!: ProjectShortResponse["shortDescription"];
  visibility!: ProjectShortResponse["visibility"];

  constructor(protected readonly props: ProjectShortResponse) {
    super(props);
    Object.assign(this, props);
  }
}
