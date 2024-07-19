import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type ProjectLinkResponse = components["schemas"]["ProjectLinkResponse"];

export interface LinkProjectInterface extends ProjectLinkResponse {}

export class LinkProject extends mapApiToClass<ProjectLinkResponse>() implements LinkProjectInterface {
  constructor(protected readonly props: ProjectLinkResponse) {
    super(props);
  }
}
