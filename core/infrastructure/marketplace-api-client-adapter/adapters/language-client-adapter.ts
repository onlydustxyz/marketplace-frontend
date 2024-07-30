import { GetLanguagesResponse } from "core/domain/language/language-contract.types";
import { LanguageList } from "core/domain/language/models/language-list.model";
import { LanguageStoragePort } from "core/domain/language/outputs/language-storage-port";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class LanguageClientAdapter implements LanguageStoragePort {
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

      return new LanguageList(data);
    };

    return {
      request,
      tag,
    };
  };
}
