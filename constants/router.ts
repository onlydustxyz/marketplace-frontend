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
    // all: "/settings",
    // profile: "/settings/profile",
    // payout: "/settings/payout",
    // billing: "/settings/billing",
    // invoices: "/settings/invoices",
    all: "/settings",
    profile: "/settings/profile",
    payoutPreferences: "/settings/payout-preferences",
    billing: {
      root: (slug: string) => `/settings/billing/${slug}`,
      generalInformation: (slug: string) => `/settings/billing/${slug}/general-information`,
      paymentMethods: (slug: string) => `/settings/billing/${slug}/payment-methods`,
      coworkers: (slug: string) => `/settings/billing/${slug}/coworkers`,
      invoices: (slug: string) => `/settings/billing/${slug}/invoices`,
    },
    migration: {},
  },
  publicProfile: {
    root: (slug: string) => `/u/${slug}`,
  },
  notFound: "/not-found",
  onboarding: "/onboarding",
  termsAndConditions: "/terms-and-conditions",
} as const;
