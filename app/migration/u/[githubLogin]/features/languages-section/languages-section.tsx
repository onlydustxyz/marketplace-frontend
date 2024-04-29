import { LanguagesAccordion } from "app/migration/u/[githubLogin]/features/languages-accordion/languages-accordion";

import { TLanguagesSection } from "./languages-section.types";

export function LanguagesSection(_: TLanguagesSection.Props) {
  const languagesMock = {
    languageName: "JavaScript",
    languageAvatarUrl: "JavaScript",
    rank: 3,
    contributionCount: 100,
    projectsCount: 3,
    rewardsCount: 88,
    earnedUsdAmount: 100,
    projects: [
      {
        name: "Bretzel",
        avatarUrl:
          "https://app.onlydust.com/cdn-cgi/image/width=96,height=96,fit=cover/https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
      },
      {
        name: "Pizzeria Yoshi !",
        avatarUrl:
          "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14305950553200301786.png",
      },
      {
        name: "Taco Tuesday",
        avatarUrl:
          "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
      },
    ],
  };
  return <LanguagesAccordion />;
}
