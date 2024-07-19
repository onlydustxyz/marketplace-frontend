import { bootstrap } from "core/bootstrap";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectSideOverview } from "app/hackathons/[hackathonSlug]/features/project-side-overview/project-side-overview";
import { IssuesSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/issues-side-wrapper/issues-side-wrapper";
import { ProjectSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/project-side-wrapper/project-side-wrapper";
import { TimelineSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/timeline-side-wrapper/timeline-side-wrapper";
import { sharedMetadata } from "app/shared-metadata";

import { Paper } from "components/atoms/paper";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Translate } from "components/layout/translate/translate";

import { Header } from "./components/header/header";
import { HackathonContextProvider } from "./context/hackathon.context";
import { Description } from "./features/description/description";
import { HackathonIssues } from "./features/hackathon-issues/hackathon-issues";
import { Info } from "./features/info/info";
import { OverviewWrapper } from "./features/overview-wrapper/overview-wrapper";
import { Projects } from "./features/projects/projects";

async function getHackathon(hackathonSlug: string) {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForServer();
    return await hackathonStorage.getHackathonBySlug({ pathParams: { hackathonSlug } }).request();
  } catch {
    notFound();
  }
}

export async function generateMetadata(props: { params: { hackathonSlug: string } }): Promise<Metadata> {
  try {
    const hackathon = await getHackathon(props.params.hackathonSlug);

    return {
      ...sharedMetadata,
      title: `${hackathon.title}`,
      description: `${hackathon.description}`,
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${hackathon.title}`,
        description: `${hackathon.description}`,
      },
      twitter: {
        title: `${hackathon.title}`,
        description: `${hackathon.description}`,
        ...sharedMetadata.twitter,
      },
    };
  } catch {
    return sharedMetadata;
  }
}

export default async function HackathonPage({ params }: { params: { hackathonSlug: string } }) {
  const hackathon = await getHackathon(params.hackathonSlug);

  return (
    <HackathonContextProvider>
      <PosthogOnMount
        eventName="hackathon_viewed"
        params={{ hackathon_id: hackathon.id }}
        paramsReady={Boolean(hackathon.id)}
      />

      <div className="flex w-full flex-col gap-4 pb-6 pt-4">
        <Header hackathonSlug={hackathon.slug} />

        <div className="relative flex w-full gap-4">
          <OverviewWrapper>
            <Paper size="m" container="2" classNames={{ base: "grid gap-4" }}>
              <HackathonCard
                title={hackathon.title}
                backgroundImage={getHackathonBackground(hackathon.index)}
                location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
                startDate={new Date(hackathon.startDate)}
                endDate={new Date(hackathon.endDate)}
                status={hackathon.getStatus()}
                projects={hackathon.projects}
                subscriberCount={hackathon.subscriberCount}
                openIssueCount={hackathon.openIssueCount}
                issueCount={hackathon.issueCount}
              />
              <Info hackathon={hackathon} />
              <Description description={hackathon.description} />
              <Projects projects={hackathon.projects} />
            </Paper>
          </OverviewWrapper>

          <TimelineSideWrapper>
            <div className="h-[2000px] bg-pink-500">TIMELINE</div>
          </TimelineSideWrapper>
          <IssuesSideWrapper>
            <HackathonIssues />
          </IssuesSideWrapper>
          <ProjectSideWrapper>
            <ProjectSideOverview />
          </ProjectSideWrapper>
        </div>
      </div>
    </HackathonContextProvider>
  );
}
