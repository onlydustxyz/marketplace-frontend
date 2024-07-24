import { bootstrap } from "core/bootstrap";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HackathonTimeline } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/hackathon-timeline";
import { ProjectSideOverview } from "app/hackathons/[hackathonSlug]/features/project-side-overview/project-side-overview";
import { Projects } from "app/hackathons/[hackathonSlug]/features/projects/projects";
import { IssuesSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/issues-side-wrapper/issues-side-wrapper";
import { ProjectSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/project-side-wrapper/project-side-wrapper";
import { TimelineSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/timeline-side-wrapper/timeline-side-wrapper";
import { sharedMetadata } from "app/shared-metadata";

import { Paper } from "components/atoms/paper";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";

import { Header } from "./components/header/header";
import { HackathonContextProvider } from "./context/hackathon.context";
import { Description } from "./features/description/description";
import { HackathonIssuesContextProvider } from "./features/hackathon-issues/context/hackathon-issues.context";
import { HackathonIssues } from "./features/hackathon-issues/hackathon-issues";
import { Info } from "./features/info/info";
import { OverviewWrapper } from "./features/overview-wrapper/overview-wrapper";

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
    <HackathonContextProvider hasEvents={!!hackathon.events?.length}>
      <PosthogOnMount
        eventName="hackathon_viewed"
        params={{ hackathon_id: hackathon.id }}
        paramsReady={Boolean(hackathon.id)}
      />

      <div className="flex h-full w-full flex-col overflow-hidden pb-0 pt-4">
        <Container size={"wide"}>
          <Header hackathonSlug={hackathon.slug} />
        </Container>

        <Container size={"wide"} className="h-full overflow-hidden py-4">
          <div className="relative flex h-full w-full gap-4 overflow-hidden">
            <OverviewWrapper>
              <ScrollView>
                <Paper size="m" container="2" classNames={{ base: "grid gap-4" }}>
                  <HackathonCard
                    title={hackathon.title}
                    backgroundImage={hackathon.backgroundImage}
                    location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
                    status={hackathon.getStatus()}
                    projects={hackathon.projects}
                    subscriberCount={hackathon.subscriberCount}
                    openIssueCount={hackathon.openIssueCount}
                    issueCount={hackathon.issueCount}
                    dates={hackathon.formatDisplayDates()}
                  />
                  <Info hackathon={hackathon} />
                  <Description description={hackathon.description} />
                  <Projects projects={hackathon.projects} />
                </Paper>
              </ScrollView>
            </OverviewWrapper>

            <TimelineSideWrapper>
              <HackathonTimeline
                todayEvents={hackathon.getTodayEvents()}
                nextEvents={hackathon.getNextEvents()}
                previousEvents={hackathon.getPreviousEvents()}
              />
            </TimelineSideWrapper>

            <HackathonIssuesContextProvider hackathonId={hackathon.id}>
              <IssuesSideWrapper>
                <HackathonIssues />
              </IssuesSideWrapper>
            </HackathonIssuesContextProvider>

            <ProjectSideWrapper>
              <ProjectSideOverview />
            </ProjectSideWrapper>
          </div>
        </Container>
      </div>
    </HackathonContextProvider>
  );
}
