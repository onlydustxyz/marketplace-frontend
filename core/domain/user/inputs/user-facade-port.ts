import { RegisterToHackathonPathParams } from "core/domain/user/user.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export interface UserFacadePort {
  registerToHackathon(
    params: HttpClientParameters<{
      PathParams: RegisterToHackathonPathParams;
    }>
  ): HttpStorageResponse<never>;
}
