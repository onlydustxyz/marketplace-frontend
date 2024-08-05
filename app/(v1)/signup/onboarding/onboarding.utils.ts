export function sanitizeData<T extends string | boolean | undefined | string[], K extends string>(key: K, data: T) {
  if (!!data || data === false || data?.length) {
    return { [key]: data };
  }

  return {};
}
