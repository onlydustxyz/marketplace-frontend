import { bootstrap } from "core/bootstrap";
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
import { Register } from "./features/register/register";

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
          <div>
            <Register hackathonId={hackathon.id} hackathonSlug={hackathon.slug} />
          </div>
          <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-4" }}>
            <HackathonCard
              title={hackathon.title}
              backgroundImage={getHackathonBackground(hackathon.index)}
              location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
              startDate={new Date(hackathon.startDate)}
              endDate={new Date(hackathon.endDate)}
              status={hackathon.status}
              projects={hackathon.projects}
            />
            <Info
              status={hackathon.status}
              communityLinks={hackathon.communityLinks}
              links={hackathon.links}
              totalBudget={hackathon.totalBudget}
              sponsors={hackathon.sponsors}
            />
            <Description description={hackathon.description} />
            <Projects />
          </Paper>
        </div>
        {/*<aside>Sidebar</aside>*/}
      </div>
    </>
  );
}