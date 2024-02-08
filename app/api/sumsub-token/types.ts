import { SUMSUB_CONST } from "app/api/sumsub-token/constants";

export namespace TSumsub {
  export interface Config {
    baseURL: string;
    method?: string;
    url?: string;
    headers?: Record<string, string>;
  }

  export type LevelName = typeof SUMSUB_CONST.KYC_LEVEL | typeof SUMSUB_CONST.KYB_LEVEL;

  export interface CreateTokenProps {
    externalId: string;
    levelName: LevelName;
  }
}
