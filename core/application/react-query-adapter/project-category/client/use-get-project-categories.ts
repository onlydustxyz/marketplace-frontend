import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { ProjectCategoryFacadePort } from "core/domain/project-category/inputs/project-category-facade-port";
import { GetProjectCategoriesResponse } from "core/domain/project-category/project-category-contract.types";

export function useGetProjectCategories({
  options,
}: UseQueryFacadeParams<ProjectCategoryFacadePort["getProjectCategories"], GetProjectCategoriesResponse>) {
  const projectCategoryStoragePort = bootstrap.getProjectCategoryStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectCategoryStoragePort.getProjectCategories({}),
      options,
    })
  );
}
