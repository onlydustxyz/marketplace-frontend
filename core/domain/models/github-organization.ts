import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

interface IGithubOrganization extends GithubOrganizationResponse {
  isInstalled: boolean;
}

export class GithubOrganization extends mapApiToClass<GithubOrganizationResponse>() implements IGithubOrganization {
  constructor(readonly props: GithubOrganizationResponse) {
    super(props);
  }

  get isInstalled() {
    return this.installationStatus !== "NOT_INSTALLED";
  }
}
