import { ACTIONS_CONFIG } from "actions/config.actions";

export const BASE_API_V1 = (path: string) => ACTIONS_CONFIG.v1(path);

export const HACKATHONS_ACTION_PATH = {
  ROOT: BASE_API_V1("hackathons"),
};
