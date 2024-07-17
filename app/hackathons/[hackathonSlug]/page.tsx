import { bootstrap } from "core/bootstrap";
import { ShortProject } from "core/domain/project/models/short-project-model";
import { notFound } from "next/navigation";

import { Paper } from "components/atoms/paper";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Translate } from "components/layout/translate/translate";

import { Header } from "./components/header/header";
import { Description } from "./features/description/description";
import { Info } from "./features/info/info";
import { Projects } from "./features/projects/projects";

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
    <>
      <PosthogOnMount
        eventName={"hackathon_viewed"}
        params={{ hackathon_id: hackathon.id }}
        paramsReady={Boolean(hackathon.id)}
      />
      <div className={"flex gap-4"}>
        <div className={"flex-1"}>
          <Header hackathonSlug={hackathon.slug} />
          <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-4" }}>
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
        </div>
        {/*<aside>Sidebar</aside>*/}
      </div>
    </>
  );
}
