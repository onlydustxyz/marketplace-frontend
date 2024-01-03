import { createFetchError, mapHttpStatusToString } from "../src/api/query.utils";
import { revalidateTag as NextRevalidateTag } from "next/cache";
import { BaseQueriesDefaultParams, BaseQueriesOptions } from "./type.actions.ts";

const defaultRevalidateValue = 60;

function convertParamsToURLSearchParams(params?: BaseQueriesDefaultParams) {
  if (!params) return undefined;
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      if (typeof value === "string" || typeof value === "number") {
        acc.append(key, value.toString());
      }
      if (typeof value === "boolean") {
        if (value) {
          acc.append(key, "true");
        } else {
          acc.append(key, "false");
        }
      }
    }
    return acc;
  }, new URLSearchParams());
}

/**
 * Performs base queries to a specified URL with provided options.
 * @template RESPONSE - The expected response type.
 * @param {string} url - The URL to which the query request is sent.
 * @param {BaseQueriesOptions | undefined} options - Optional query options including callbacks and cache settings.
 * @returns {Promise<RESPONSE>} - A promise that resolves with the response of the specified type.
 * @throws - Throws an error if the fetch request fails.
 * @example
 * const response = await BaseQueries<{ message: string }>(
 *   'https://api.example.com/items',
 *   {
 *     cache: 'force-cache',
 *     revalidate: 60,
 *     provideTag: ['collection'],
 *     revalidateTag: ['collection'],
 *     onSuccess: () => console.log('Success'),
 *     onError: () => console.log('Error')
 *   }
 * );
 */
export async function BaseQueries<RESPONSE extends object>(
  url: string,
  options: BaseQueriesOptions | undefined
): Promise<RESPONSE> {
  const { provideTag, revalidate, revalidateTag, onSuccess, onError, ...baseOptions } = options || {};
  const queriesParams = convertParamsToURLSearchParams(options?.params);
  const data = await fetch(`${url}${queriesParams ? `?${queriesParams}` : ""}`, {
    cache: "no-store",
    ...(baseOptions || {}),
    next: {
      ...(revalidate ? { revalidate: revalidate || defaultRevalidateValue } : {}),
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

/**
 * Creates a lazy query function that can be called later.
 * @template RESPONSE - The expected response type.
 * @param {string} url - The URL to which the query request will be sent.
 * @param {BaseQueriesOptions | undefined} options - Optional query options.
 * @returns {() => Promise<RESPONSE>} - A function that returns a promise with the response.
 * @example
 * const lazyQuery = BaseLazyQueries<{ message: string }>(
 *   'https://api.example.com/items',
 *   { cache: 'force-cache' }
 * );
 * const response = await lazyQuery();
 */
export function BaseLazyQueries<RESPONSE extends object>(
  url: string,
  options: BaseQueriesOptions | undefined
): () => Promise<RESPONSE> {
  return () => {
    return BaseQueries(url, options);
  };
}
