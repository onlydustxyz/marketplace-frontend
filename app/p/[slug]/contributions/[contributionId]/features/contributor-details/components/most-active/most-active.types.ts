import { TDotsStatus } from "app/u/[githubLogin]/components/dots-status/dots-status.types";

export namespace TMostActive {
  export interface Props {
    logoUrl: string;
    name: string;
    status: TDotsStatus.Props["status"];
  }
}
