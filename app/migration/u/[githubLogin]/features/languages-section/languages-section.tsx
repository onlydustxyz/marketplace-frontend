import { ContributionList } from "app/migration/u/[githubLogin]/components/contribution-list/contribution-list";
import { DetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion";
import { TDetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { PreRenderOnServer } from "components/layout/client-only/client-only";

import { TLanguagesSection } from "./languages-section.types";

export function LanguagesSection(_: TLanguagesSection.Props) {
  const languagesMock = [
    {
      name: "JavaScript",
      avatarUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/abf86b52ea37add55e4deda258bade06.jpeg",
      rankStatus: "good",
      contributionCount: 100,
      projectsCount: 3,
      rewardsCount: 88,
      earnedUsdAmount: 100,
      projects: [
        {
          name: "Bretzel",
          slug: "bretzel",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=96,height=96,fit=cover/https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
          hasMissingGithubAppInstallation: false,
          hasPendingInvitation: false,
        },
        {
          name: "Pizzeria Yoshi !",
          slug: "Pizzeria Yoshi !",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14305950553200301786.png",
          hasMissingGithubAppInstallation: false,
          hasPendingInvitation: true,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: true,
          hasPendingInvitation: false,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: true,
          hasPendingInvitation: false,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: true,
          hasPendingInvitation: false,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: true,
          hasPendingInvitation: false,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: true,
          hasPendingInvitation: false,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: true,
          hasPendingInvitation: false,
        },
      ],
    },
    {
      name: "Rust",
      avatarUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/abf86b52ea37add55e4deda258bade06.jpeg",
      rankStatus: "bad",
      contributionCount: 100,
      projectsCount: 3,
      rewardsCount: 88,
      earnedUsdAmount: 100,
      projects: [
        {
          name: "Bretzel",
          slug: "Bretzel",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=96,height=96,fit=cover/https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
          hasMissingGithubAppInstallation: false,
          hasPendingInvitation: false,
        },
        {
          name: "Pizzeria Yoshi !",
          slug: "Pizzeria Yoshi !",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14305950553200301786.png",
          hasMissingGithubAppInstallation: false,
          hasPendingInvitation: true,
        },
        {
          name: "Taco Tuesday",
          slug: "Taco Tuesday",
          avatarUrl:
            "https://app.onlydust.com/cdn-cgi/image/width=48,height=48,fit=cover/https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6987338668519888809.jpg",
          hasMissingGithubAppInstallation: false,
          hasPendingInvitation: false,
        },
      ],
    },
  ] as TDetailsAccordion.Detail[];
  return (
    <>
      <DetailsAccordion details={languagesMock}>
        <ContributionList />
      </DetailsAccordion>
      <PreRenderOnServer>
        <ContributionList />
      </PreRenderOnServer>
    </>
  );
}
