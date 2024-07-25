import { components } from "src/__generated/api";

type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

interface GithubOrganizationInterface extends GithubOrganizationResponse {
  isInstalled(): boolean;
}

export class GithubOrganization implements GithubOrganizationInterface {
  avatarUrl!: GithubOrganizationResponse["avatarUrl"];
  githubUserId!: GithubOrganizationResponse["githubUserId"];
  htmlUrl!: GithubOrganizationResponse["htmlUrl"];
  installationId!: GithubOrganizationResponse["installationId"];
  installationStatus!: GithubOrganizationResponse["installationStatus"];
  isCurrentUserAdmin!: GithubOrganizationResponse["isCurrentUserAdmin"];
  isPersonal!: GithubOrganizationResponse["isPersonal"];
  login!: GithubOrganizationResponse["login"];
  name!: GithubOrganizationResponse["name"];
  repos!: GithubOrganizationResponse["repos"];

  constructor(props: GithubOrganizationResponse) {
    Object.assign(this, props);
  }

  isInstalled() {
    return this.installationStatus !== "NOT_INSTALLED";
  }
}
