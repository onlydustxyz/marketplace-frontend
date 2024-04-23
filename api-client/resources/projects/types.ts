import { components, operations } from "src/__generated/api";

type ProjectsListResponse = components["schemas"]["ProjectPageResponse"];
type ProjectListParameters = operations["getProjects"]["parameters"]["query"];
export interface ListProjectsResponse extends ProjectsListResponse {}
export interface ListProjectsParameters extends ProjectListParameters {}
