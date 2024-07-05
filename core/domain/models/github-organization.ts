import { components } from "src/__generated/api";

// export abstract class Entity<T extends object> {
//   protected props: T;
//
//   constructor(props: T) {
//     const handler = () => {
//       return {
//         set(obj: any, prop: string, value: any) {
//           obj[prop] = value;
//           return true;
//         },
//       };
//     };
//
//     this.props = new Proxy(props, handler());
//   }
// }

type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

interface IGithubOrganization extends GithubOrganizationResponse {
  isInstalled: boolean;
}

export class GithubOrganization implements IGithubOrganization {
  // avatarUrl;
  // githubUserId;
  // installationStatus;
  // isCurrentUserAdmin;
  // login;
  // name;
  // repos;
  // installationId;
  // isPersonal;

  constructor(props: GithubOrganizationResponse) {
    Object.assign(this, props);
    // this.avatarUrl = props.avatarUrl;
    // this.githubUserId = props.githubUserId;
    // this.installationStatus = props.installationStatus;
    // this.isCurrentUserAdmin = props.isCurrentUserAdmin;
    // this.login = props.login;
    // this.name = props.name;
    // this.repos = props.repos;
    // this.installationId = props.installationId;
    // this.isPersonal = props.isPersonal;
  }

  get isInstalled() {
    return this.installationStatus !== "NOT_INSTALLED";
  }
}

export function GithubOrganizationFn(props: GithubOrganizationResponse): IGithubOrganization {
  const { installationStatus } = props;

  const isInstalled = installationStatus !== "NOT_INSTALLED";

  return {
    ...props,
    isInstalled,
  };
}
