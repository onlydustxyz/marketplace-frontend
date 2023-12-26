import { API_PATH } from "../../../../../src/api/ApiPath.ts";
import { createFetchError, mapHttpStatusToString } from "../../../../../src/api/query.utils.ts";
import { API_HOST_NAME } from "../../../utils/host.api.ts";
import { BASE_API_V1 } from "../../../utils/base.api.ts";

export const GET_PROJECT_BY_SLUG = API_PATH.PROJECTS_BY_SLUG;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    // todo error handling
    return "coucou";
  }

  const project = await fetch(API_HOST_NAME(API_PATH.PROJECTS_BY_SLUG(slug)))
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw createFetchError(res, mapHttpStatusToString);
    })
    .catch(() => {
      console.log("errror");
    });
  const data = await project.json();

  return Response.json(data);
}
