import { createFetchError, mapHttpStatusToString } from "../src/api/query.utils";
import { revalidateTag as NextRevalidateTag } from "next/cache";
import { BaseQueriesOptions } from "./type.actions.ts";

const defaultRevalidateValue = 60;
export async function BaseQueries<RESPONSE extends object>(
  url: string,
  options: BaseQueriesOptions | undefined
): Promise<RESPONSE> {
  const { provideTag, revalidate, revalidateTag, onSuccess, onError, ...baseOptions } = options || {};

  const data = await fetch(url, {
    cache: "no-store",
    ...(baseOptions || {}),
    next: {
      revalidate: revalidate || defaultRevalidateValue,
      tags: provideTag,
    },
  });

  if (data.ok) {
    if (revalidateTag) {
      revalidateTag.map(tag => NextRevalidateTag(tag));
    }
    if (onSuccess) {
      onSuccess();
    }
    return data.json();
  }

  if (onError) {
    onError();
  }

  throw createFetchError(data, mapHttpStatusToString);
}

export function BaseLazyQueries<RESPONSE extends object>(
  url: string,
  options: BaseQueriesOptions | undefined
): () => Promise<RESPONSE> {
  return () => {
    return BaseQueries(url, options);
  };
}

// const test = await BaseQueries<{ coucou: string }>(ACTION_PATH.PROJECTS_BY_SLUG("coucou"), {
//   cache: "force-cache",
//   revalidate: 60,
//   provideTag: ["collection"],
//   revalidateTag: ["collection"],
//
//   onSuccess: () => {
//     console.log("success");
//   },
//   onError: () => {
//     console.log("error");
//   },
// });
//
// console.log("test", test);

// projectRequest

// function getProjectBySlug() {
//   return BaseRequest("https://jsonplaceholder.typicode.com/todos/1");
// }
//
// const ProjectApi = {
//   queries: {
//     getProjectBySlug,
//   },
//   mutation: {},
//   tags: {
//     PROJECT_SLUG: "",
//   },
// };
