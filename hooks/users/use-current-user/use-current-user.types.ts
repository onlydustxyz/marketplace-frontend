import type { UseQueryResult } from "@tanstack/react-query";

import { UseGetUserMeResponse } from "src/api/me/queries";

export namespace TUseCurrentUser {
  export type Return = {
    user?: UseGetUserMeResponse;
    githubUserId?: number;
  } & Omit<UseQueryResult<UseGetUserMeResponse>, "data">;
}
