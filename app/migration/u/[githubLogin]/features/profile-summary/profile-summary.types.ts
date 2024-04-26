import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TProfileSummary {
  interface Social {
    name: string;
    iconName: RemixIconsName;
    url: string;
  }
  export interface Props {
    bio?: string;
    socials: Social[];
    githubRegistrationDate: string;
    onlydustRegistrationDate: string;
  }
}
