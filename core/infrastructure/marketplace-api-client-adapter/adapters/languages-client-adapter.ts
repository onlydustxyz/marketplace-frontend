import { GetLanguagesResponse } from "core/domain/languages/languages-contract.types";
import { ListLanguage } from "core/domain/languages/models/languages-list.model";
import { LanguagesStoragePort } from "core/domain/languages/outputs/languages-storage-port";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class LanguagesClientAdapter implements LanguagesStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getLanguages: "languages",
  } as const;

  getLanguages = () => {
    const path = this.routes["getLanguages"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetLanguagesResponse>({
        path,
        method,
        tag,
      });

      return new ListLanguage(data);
    };

    return {
      request,
      tag,
    };
  };
}
