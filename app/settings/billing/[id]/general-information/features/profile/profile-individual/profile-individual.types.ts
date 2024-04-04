import { PropsWithChildren } from "react";

import { components } from "src/__generated/api";

export namespace TProfileIndividual {
  export interface Props extends PropsWithChildren {
    profile: components["schemas"]["KYCResponse"] | undefined;
  }
}
