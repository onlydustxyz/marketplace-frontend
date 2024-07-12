import { bootstrap } from "core/bootstrap";
import { Hackathon } from "core/domain/hackathon/models/hackathon-modal";
import { notFound } from "next/navigation";

import { Header } from "app/hackathons/[hackathonSlug]/components/header/header";

import { Paper } from "components/atoms/paper";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";

async function getHackathon(hackathonSlug: string) {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForClient();
    return await hackathonStorage.getHackathonBySlug({ pathParams: { hackathonSlug } }).request();
  } catch {
    notFound();
  }
}

export default async function HackathonPage({ params }: { params: { hackathonSlug: string } }) {
  const data = await getHackathon(params.hackathonSlug);
  const hackathon = new Hackathon(data);

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
          <Paper size={"m"}>{hackathon.title}</Paper>
        </div>
        {/*<aside>Sidebar</aside>*/}
      </div>
    </>
  );
}
