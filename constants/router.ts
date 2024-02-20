export const NEXT_ROUTER = {
  projects: {
    all: "/",
    details: (slug: string) => `/p/${slug}`,
  },
  settings: {
    profile: "/settings/profile",
    payout: "/settings/payout",
    billing: "/settings/billing",
  },
};
