import { bootstrap } from "core/bootstrap";
import { notFound } from "next/navigation";

import { Header } from "app/hackathons/[hackathonSlug]/components/header/header";

import { Paper } from "components/atoms/paper";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Translate } from "components/layout/translate/translate";

async function getHackathon(hackathonSlug: string) {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForClient();
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
          <Paper size={"m"} container={"2"}>
            <HackathonCard
              classNames={{ base: "w-full block" }}
              title={hackathon.title}
              backgroundImage={getHackathonBackground(hackathon.index)}
              location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
              startDate={new Date(hackathon.startDate)}
              endDate={new Date(hackathon.endDate)}
              status={hackathon.getStatus()}
              projects={hackathon.projects}
            />
          </Paper>
        </div>
        {/*<aside>Sidebar</aside>*/}
      </div>
    </>
  );
}
