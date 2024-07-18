import { bootstrap } from "core/bootstrap";
import { ShortProject } from "core/domain/project/models/short-project-model";
import { notFound } from "next/navigation";

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
import { SideWrapper } from "./features/side-wrapper/side-wrapper";

async function getHackathon(hackathonSlug: string) {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForServer();
    return await hackathonStorage.getHackathonBySlug({ pathParams: { hackathonSlug } }).request();
  } catch {
    notFound();
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

        <div className="flex w-full gap-4">
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
              <Projects projects={hackathon.projects.map(project => new ShortProject(project))} />
            </Paper>
          </OverviewWrapper>

          <SideWrapper>
            <HackathonIssues />
          </SideWrapper>
        </div>
      </div>
    </HackathonContextProvider>
  );
}
