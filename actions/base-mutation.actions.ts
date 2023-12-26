import { BaseQueries } from "./base-queries.actions";
import { BaseMutationOptions } from "./type.actions";

export function BaseMutationActions<RESPONSE extends object>(
  url: string,
  body: object,
  options: BaseMutationOptions | undefined
): Promise<RESPONSE> {
  return BaseQueries(url, {
    ...(options || {}),
    body: JSON.stringify(body),
  });
}
export function BaseLazyMutation<RESPONSE extends object, BODY extends object | undefined>(
  url: string,
  options: BaseMutationOptions | undefined
): (body: BODY) => Promise<RESPONSE> {
  return (body: BODY) => {
    return BaseQueries(url, {
      ...(options || {}),
      body: JSON.stringify(body),
    });
  };
}

// const mutateResult = await BaseMutationActions<{ coucou: string }>(ACTION_PATH.PROJECTS_BY_SLUG("coucou"), {}, {});
//
// const lazyMutation = BaseLazyMutation<{ coucou: string }, { field1: string }>(
//   ACTION_PATH.PROJECTS_BY_SLUG("coucou"),
//   {}
// );
// const test = await lazyMutation({ field1: "coucou" });

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
