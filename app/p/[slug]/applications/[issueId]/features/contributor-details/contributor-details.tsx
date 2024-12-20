import { useParams, useRouter } from "next/navigation";

import { useContributorDetails } from "app/p/[slug]/applications/[issueId]/features/contributor-details/contributor-details.hooks";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Typography } from "components/layout/typography/typography";
import { Helper } from "components/molecules/helper";

import { NEXT_ROUTER } from "constants/router";

import { Activity } from "./components/activity/activity";
import { MostActiveEcosystems } from "./components/most-active-ecosystems/most-active-ecosystems";
import { MostActiveLanguages } from "./components/most-active-languages/most-active-languages";
import { TotalEarned } from "./components/total-earned/total-earned";
import { ContributorDetailsLoading } from "./contributor-details.loading";
import { TContributorDetails } from "./contributor-details.types";

export function ContributorDetails({ githubId, applicationId }: TContributorDetails.Props) {
  const router = useRouter();
  const { slug = "" } = useParams<{ slug?: string }>();

  const { userProfile, acceptApplication, application, isLoading, isPending } = useContributorDetails({
    githubId,
    applicationId,
  });

  const isFromGithub = application?.origin === "GITHUB";

  async function handleAcceptApplication() {
    await acceptApplication({});
    router.push(NEXT_ROUTER.projects.details.root(slug));
  }

  if (isLoading) {
    return <ContributorDetailsLoading />;
  }

  return (
    <ScrollView>
      <Flex direction="col" className="flex-1 gap-6">
        {userProfile && (
          <ProfileCard login={userProfile.login} avatarUrl={userProfile.avatarUrl} {...userProfile.statsSummary} />
        )}
        {isFromGithub && (
          <Helper
            title={{ translate: { token: "v2.pages.project.details.applicationDetails.originGithub.title" } }}
            text={{ translate: { token: "v2.pages.project.details.applicationDetails.originGithub.content" } }}
            container={"brand-2"}
          />
        )}
        <Card background="base" hasPadding={false} border={false} className="relative">
          <Flex className="w-full flex-col gap-6 p-4">
            <MostActiveLanguages githubId={githubId} />
            <MostActiveEcosystems githubId={githubId} />
            <Flex direction="col" className="gap-3" width="full">
              <Flex alignItems="center" className="gap-2">
                <Icon remixName="ri-sparkling-line" size={20} />
                <Typography
                  translate={{ token: "v2.pages.project.details.applicationDetails.profile.stats.title" }}
                  variant="body-m-bold"
                />
              </Flex>
              <Flex className="w-full flex-col gap-3 min-[1600px]:flex-row min-[1600px]:items-stretch">
                <Activity githubId={githubId} />
                <TotalEarned githubId={githubId} />
              </Flex>
            </Flex>
            <Flex className="w-full flex-col gap-3">
              <Typography
                variant={"body-m-bold"}
                translate={{ token: "v2.pages.project.details.applicationDetails.profile.motivations.comment" }}
              />
              <Paper size={"m"} container={"3"} border={"none"}>
                <Typography variant="body-m" className="min-h-5 text-greyscale-200">
                  {application?.githubComment}
                </Typography>
              </Paper>
            </Flex>
          </Flex>
          <div className="sticky bottom-0 left-0 flex flex-row items-center justify-end gap-3 bg-card-background-base px-4 py-3">
            <Button
              variant="primary"
              size="m"
              translate={{ token: "v2.pages.project.details.applicationDetails.profile.buttons.assign" }}
              onClick={handleAcceptApplication}
              isLoading={isPending}
            />
          </div>
        </Card>
      </Flex>
    </ScrollView>
  );
}
