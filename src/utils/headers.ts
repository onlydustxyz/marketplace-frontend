export const cacheHeader = { "X-Cache-Api": 1 };

export const contextWithCacheHeaders = { context: { headers: { ...cacheHeader } } };
