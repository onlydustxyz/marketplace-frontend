import { BaseQueries } from "./base-queries.actions";
import { BaseMutationOptions } from "./type.actions";

/**
 * Performs a base mutation action by sending a request to a specified URL with a given body and options.
 * @views RESPONSE - The expected response type.
 * @param {string} url - The URL to which the mutation request is sent.
 * @param {object} body - The body of the request.
 * @param {BaseMutationOptions | undefined} options - Optional mutation options.
 * @returns {Promise<RESPONSE>} - A promise that resolves with the response of the specified type.
 * @example
 * const mutateResult = await BaseMutationActions<{ message: string }>(
 *   'https://api.example.com/items',
 *   { name: 'New Item' },
 *   {}
 * );
 */
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

/**
 * Creates a lazy mutation function that can be called later with a body.
 * @views RESPONSE - The expected response type.
 * @views BODY - The type of the body that will be provided when calling the function.
 * @param {string} url - The URL to which the mutation request will be sent.
 * @param {BaseMutationOptions | undefined} options - Optional mutation options.
 * @returns {(body: BODY) => Promise<RESPONSE>} - A function that takes a body and returns a promise with the response.
 * @example
 * const lazyMutation = BaseLazyMutation<{ message: string }, { name: string }>(
 *   'https://api.example.com/items',
 *   {}
 * );
 * const response = await lazyMutation({ name: 'New Lazy Item' });
 */
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
