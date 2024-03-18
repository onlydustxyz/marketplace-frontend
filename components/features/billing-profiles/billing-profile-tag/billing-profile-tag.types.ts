import { TIcon } from "components/layout/icon/icon.types";

export namespace TBillingProfileTag {
  export interface Props {
    fallback?: string;
    profile?: {
      name: string;
      icon: TIcon.Props;
      id: string;
    };
  }
}
