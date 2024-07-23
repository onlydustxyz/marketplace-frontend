import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

interface GithubOrganizationInterface extends GithubOrganizationResponse {
  isInstalled: boolean;
}

class GithubOrganization extends mapApiToClass<GithubOrganizationResponse>() implements GithubOrganizationInterface {
  constructor(protected props: GithubOrganizationResponse) {
    super(props);
  }

  get isInstalled() {
    return this.installationStatus !== "NOT_INSTALLED";
  }
}

export { GithubOrganization };
