import { components } from "src/__generated/api";

type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

interface IGithubOrganization extends GithubOrganizationResponse {
  isInstalled: boolean;
}

function createClassFromProps<T>() {
  return class {
    constructor(args: T) {
      Object.assign(this, args);
    }
  } as {
    new (args: T): T;
  };
}

export class GithubOrganization
  extends createClassFromProps<GithubOrganizationResponse>()
  implements IGithubOrganization
{
  constructor(props: GithubOrganizationResponse) {
    super(props);
  }

  get isInstalled() {
    return this.installationStatus !== "NOT_INSTALLED";
  }
}
