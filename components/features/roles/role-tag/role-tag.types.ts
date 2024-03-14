import { TIcon } from "components/layout/icon/icon.types";

export namespace TRoleTag {
  export interface Props {
    fallback?: string;
    role?: {
      type: string;
      icon: TIcon.Props;
    };
    clickable?: boolean;
  }
}
