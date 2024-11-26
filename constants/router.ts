export const NEXT_ROUTER = {
  home: {
    all: "/",
  },
  projects: {
    all: "/projects",
    allWithParams: (params: { [key: string]: string }) => {
      const searchParams = new URLSearchParams(params);
      return `/projects?${searchParams.toString()}`;
    },
    details: {
      root: (slug: string) => `/p/${slug}`,
      contributors: (slug: string) => `/p/${slug}/contributors`,
      applications: {
        root: (slug: string) => `/p/${slug}/applications`,
        details: (slug: string, issueId: string) => `/p/${slug}/applications/${issueId}`,
      },
      rewards: {
        root: (slug: string) => `/p/${slug}/rewards`,
        new: (slug: string) => `/p/${slug}/rewards/new`,
      },
      edit: (slug: string) => `/p/${slug}/edit`,
      contributions: {
        root: (slug: string) => `/p/${slug}/contributions`,
      },
      insights: (slug: string) => `/p/${slug}/insights`,
    },
    creation: "/p/create",
  },
  contributions: {
    all: "/contributions",
  },
  applications: {
    all: "/applications",
  },
  rewards: {
    all: "/rewards",
  },
  settings: {
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
  },
  publicProfile: {
    root: (githubLogin: string) => `/u/${githubLogin}`,
  },
  notFound: "/not-found",
  hackathons: {
    root: "/hackathons",
    details: {
      root: (slug: string) => `/hackathons/${slug}`,
    },
  },
  ecosystems: {
    root: "/ecosystems",
    details: {
      root: (slug: string) => `/ecosystems/${slug}`,
    },
  },
  signup: {
    root: "/signup",
    onboarding: {
      root: "/signup/onboarding",
      projectRecommendations: "/signup/onboarding/project-recommendations",
      verifyInformation: "/signup/onboarding/verify-information",
      completeYourProfile: "/signup/onboarding/complete-your-profile",
      termsAndConditions: "/signup/onboarding/terms-and-conditions",
      payoutInformation: "/signup/onboarding/payout-information",
    },
  },
  legalNotice: {
    root: "/legal-notice",
  },
} as const;
