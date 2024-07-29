import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { ProjectCategoriesFacadePort } from "core/domain/project-categories/inputs/project-categories-facade-port";
import { GetProjectCategoriesResponse } from "core/domain/project-categories/project-categories-contract.types";

export function useGetProjectCategories({
  options,
}: UseQueryFacadeParams<ProjectCategoriesFacadePort["getProjectCategories"], GetProjectCategoriesResponse>) {
  const projectCategoriesStoragePort = bootstrap.getProjectCategoriesStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectCategoriesStoragePort.getProjectCategories({}),
      options,
    })
  );
}
