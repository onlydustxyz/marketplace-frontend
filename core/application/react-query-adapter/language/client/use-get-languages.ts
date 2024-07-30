import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { LanguageFacadePort } from "core/domain/language/inputs/language-facade-port";
import { GetLanguagesResponse } from "core/domain/language/language-contract.types";

export function useGetLanguages({
  options,
}: UseQueryFacadeParams<LanguageFacadePort["getLanguages"], GetLanguagesResponse>) {
  const languagesStoragePort = bootstrap.getLanguagesStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...languagesStoragePort.getLanguages({}),
      options,
    })
  );
}
