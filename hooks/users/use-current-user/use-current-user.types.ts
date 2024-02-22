import { UseGetUserMeResponse } from "src/api/me/queries";

export namespace TUseCurrentUser {
  export interface Return {
    user?: UseGetUserMeResponse;
    githubUserId?: number;
    isLoading: boolean;
  }
}
