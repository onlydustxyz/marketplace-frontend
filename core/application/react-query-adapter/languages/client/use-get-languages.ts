import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { GetLanguagesResponse } from "core/domain/languages/languages-contract.types";
import { ProjectCategoryFacadePort } from "core/domain/project-category/inputs/project-category-facade-port";

export function useGetLanguages({
  options,
}: UseQueryFacadeParams<ProjectCategoryFacadePort["getProjectCategories"], GetLanguagesResponse>) {
  const languagesStoragePort = bootstrap.getLanguagesStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...languagesStoragePort.getLanguages({}),
      options,
    })
  );
}
