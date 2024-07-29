import { HackathonListInterface } from "core/domain/hackathon/models/hackathon-list-model";
import { HackathonInterface } from "core/domain/hackathon/models/hackathon-model";
import { LinkProjectInterface } from "core/domain/project/models/link-project-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components, operations } from "src/__generated/api";

/* --------------------------------- Get hackathons -------------------------------- */

export type GetHackathonsResponse = components["schemas"]["HackathonsListResponse"];

export type GetHackathonsPortParams = HttpClientParameters<object>;

export type GetHackathonsPortResponse = HttpStorageResponse<{ hackathons: HackathonListInterface[] }>;

/* --------------------------------- Get hackathon by slug -------------------------------- */

type GetHackathonBySlugPathParams = operations["getHackathonBySlug"]["parameters"]["path"];

export type GetHackathonBySlugResponse = components["schemas"]["HackathonsDetailsResponse"];

export type GetHackathonsBySlugPortParams = HttpClientParameters<{
  PathParams: GetHackathonBySlugPathParams;
}>;

export type GetHackathonBySlugPortResponse = HttpStorageResponse<HackathonInterface>;

/* --------------------------------- Get hackathon project issues -------------------------------- */

type GetHackathonByIdProjectIssuesPathParams = operations["getHackathonIssues"]["parameters"]["path"];
type GetHackathonByIdProjectIssuesQueryParams = operations["getHackathonIssues"]["parameters"]["query"];

export type GetHackathonByIdProjectIssuesResponse = components["schemas"]["HackathonProjectsIssuesResponse"];

export type GetHackathonByIdProjectIssuesPortParams = HttpClientParameters<{
  PathParams: GetHackathonByIdProjectIssuesPathParams;
  QueryParams: GetHackathonByIdProjectIssuesQueryParams;
}>;

export type GetHackathonByIdProjectIssuesFormattedResponse = Omit<GetHackathonByIdProjectIssuesResponse, "projects"> & {
  projects: Omit<GetHackathonByIdProjectIssuesResponse["projects"][number], "project"> &
    {
      project: LinkProjectInterface;
    }[];
};

export type GetHackathonByIdProjectIssuesPortResponse =
  HttpStorageResponse<GetHackathonByIdProjectIssuesFormattedResponse>;
