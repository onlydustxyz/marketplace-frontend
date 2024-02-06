import { SUMSUB_CONST } from "app/api/sumsub-token/constants";

export namespace TVerifySidePanel {
  export interface Props {
    levelName: typeof SUMSUB_CONST.KYC_LEVEL | typeof SUMSUB_CONST.KYB_LEVEL;
    externalId: string;
  }
}
