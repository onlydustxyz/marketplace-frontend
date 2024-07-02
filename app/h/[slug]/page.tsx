import { hackathonsApiClient } from "api-client/resources/hackathons";
import { notFound } from "next/navigation";
import { isHackathonFuture } from "utils/hackathons/is-future";
import { isHackathonLive } from "utils/hackathons/is-live";

import { Intro } from "app/h/[slug]/features/intro/intro";
import { MainDescription } from "app/h/[slug]/features/main-description/main-description";
import { Overview } from "app/h/[slug]/features/overview/overview";
import { Tracks } from "app/h/[slug]/features/tracks/tracks";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Flex } from "components/layout/flex/flex";
import { HackathonStatus } from "components/organisms/hackathon-card";

import { Header } from "./components/header/header";
import { RegistrationWrapper } from "./features/registration-wrapper/registration-wrapper";

async function getHackathon(slug: string) {
  try {
    return await hackathonsApiClient.fetch.getHackathonBySlug(slug).request();
  } catch {
    notFound();
  }
}

export default async function HackathonPage({ params }: { params: { slug: string } }) {
  const data = await getHackathon(params.slug);
  function getStatus(): HackathonStatus {
    const isLive = isHackathonLive(data);
    const isFuture = isHackathonFuture(data);

    if (isLive) {
      return "live";
    }

    if (isFuture) {
      return "open";
    }

    return "closed";
  }

  const status = getStatus();

  return (
    <>
      <PosthogOnMount
        eventName={"hackathon_viewed"}
        params={{ hackathon_id: data.id }}
        paramsReady={Boolean(data.id)}
      />
      <Header slug={data.slug} title={data.title} startDate={data.startDate} status={status} projects={data.projects} />

      <div className="flex w-full flex-col items-start justify-start gap-6 pb-6 pt-6 md:pt-14">
        <Intro title={data.title} subtitle={data.subtitle} />
        <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
          <div className="w-full md:w-[400px]">
            <Flex direction="col" className="gap-6">
              <RegistrationWrapper hackathonId={data.id} hackathonSlug={data.slug} />

              <Overview
                startDate={data.startDate}
                endDate={data.endDate}
                totalBudget={data.totalBudget}
                links={data.links}
                sponsors={data.sponsors}
                projects={data.projects}
              />
            </Flex>
          </div>
          <div className="flex h-auto w-full flex-1 flex-col items-start justify-start gap-6">
            <MainDescription description={data.description} />
            <div className="w-full" id={"tracks"}>
              <Tracks data={data.tracks} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
