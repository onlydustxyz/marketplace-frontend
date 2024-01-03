export const ACTIONS_CONFIG = {
  host: (path: string) => `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}${path}`,
  v1: (path: string) => `${ACTIONS_CONFIG.host(`/api/v1/${path}`)}`,
};
