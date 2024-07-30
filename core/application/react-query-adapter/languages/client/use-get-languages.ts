import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { GetLanguagesResponse } from "core/domain/languages/languages-contract.types";
import { ProjectCategoriesFacadePort } from "core/domain/project-categories/inputs/project-categories-facade-port";

export function useGetLanguages({
  options,
}: UseQueryFacadeParams<ProjectCategoriesFacadePort["getProjectCategories"], GetLanguagesResponse>) {
  const languagesStoragePort = bootstrap.getLanguagesStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...languagesStoragePort.getLanguages({}),
      options,
    })
  );
}
