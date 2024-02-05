export const NEXT_ROUTER = {
  projects: {
    all: "/",
    details: (slug: string) => `/p/${slug}`,
  },
  settings: {
    profile: "/migration/settings/profile",
    payout: "/migration/settings/payout",
  },
};
