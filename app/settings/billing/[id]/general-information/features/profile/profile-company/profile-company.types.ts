import { PropsWithChildren } from "react";

import { components } from "src/__generated/api";

export namespace TProfileCompany {
  export interface Props extends PropsWithChildren {
    profile: components["schemas"]["KYBResponse"] | undefined;
  }
}
