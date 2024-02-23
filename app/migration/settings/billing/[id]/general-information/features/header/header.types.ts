import { PropsWithChildren } from "react";

import { MeTypes } from "src/api/me/types";

export namespace THeader {
  export interface Props extends PropsWithChildren {
    initialData?: formData;
  }

  export interface formData {
    profile: MeTypes.billingProfileType;
  }
}
