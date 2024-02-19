export const NEXT_ROUTER = {
  projects: {
    all: "/",
    details: {
      root: (slug: string) => `/p/${slug}`,
      contributors: (slug: string) => `/p/${slug}/contributors`,
      rewards: {
        root: (slug: string) => `/p/${slug}/rewards`,
        new: (slug: string) => `/p/${slug}/rewards/new`,
      },
      edit: (slug: string) => `/p/${slug}/edit`,
      contributions: (slug: string) => `/p/${slug}/contributions`,
      insights: (slug: string) => `/p/${slug}/insights`,
    },
    creation: "/p/create",
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
  publicProfile: {
    root: (slug: string) => `/u/${slug}`,
  },
  notFound: "/not-found",
} as const;
