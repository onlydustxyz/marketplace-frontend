import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type ProjectShortResponse = components["schemas"]["ProjectShortResponse"];

export interface ShortProjectInterface extends ProjectShortResponse {}

export class ShortProject extends mapApiToClass<ProjectShortResponse>() implements ShortProjectInterface {
  constructor(readonly props: ProjectShortResponse) {
    super(props);
  }
}
