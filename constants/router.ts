export const NEXT_ROUTER = {
  projects: {
    all: "/",
    details: (slug: string) => `/p/${slug}`,
    creation: "/p/create",
  },
  p: {
    root: (slug: string) => `/p/${slug}`,
    contributors: (slug: string) => `/p/${slug}/contributors`,
    rewards: (slug: string) => `/p/${slug}/rewards`,
    edit: (slug: string) => `/p/${slug}/edit`,
    contributions: (slug: string) => `/p/${slug}/contributions`,
    insights: (slug: string) => `/p/${slug}/insights`,
  },
  contributions: {
    all: "/contributions",
  },
  rewards: {
    all: "/rewards",
  },
  settings: {
    all: "/settings",
    profile: "/settings/profile",
    payout: "/settings/payout",
    billing: "/settings/billing",
  },
} as const;
