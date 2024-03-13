import { NEXT_ROUTER } from "constants/router";

export const NextMigratedRoute = [
  {
    pathName: "/migration/projects",
    nextPathName: "/migration/projects",
  },
  {
    pathName: NEXT_ROUTER.settings.profile,
    nextPathName: NEXT_ROUTER.settings.profile,
  },
  {
    pathName: NEXT_ROUTER.settings.payoutPreferences,
    nextPathName: NEXT_ROUTER.settings.payoutPreferences,
  },
  {
    pathName: NEXT_ROUTER.settings.billing,
    nextPathName: NEXT_ROUTER.settings.billing,
  },
];
