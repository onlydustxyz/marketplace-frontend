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
    invoices: "/settings/invoices",
    migration: {
      all: "/migration/settings",
      profile: "/migration/settings/profile",
      payoutPreferences: "/migration/settings/payout-preferences",
      billing: {
        root: (slug: string) => `/migration/settings/billing/${slug}`,
        generalInformation: (slug: string) => `/migration/settings/billing/${slug}/general-information`,
        paymentMethods: (slug: string) => `/migration/settings/billing/${slug}/payment-methods`,
        coworkers: (slug: string) => `/migration/settings/billing/${slug}/coworkers`,
        invoices: (slug: string) => `/migration/settings/billing/${slug}/invoices`,
      },
    },
  },
  publicProfile: {
    root: (slug: string) => `/u/${slug}`,
  },
  notFound: "/not-found",
  onboarding: "/onboarding",
  termsAndConditions: "/terms-and-conditions",
} as const;
