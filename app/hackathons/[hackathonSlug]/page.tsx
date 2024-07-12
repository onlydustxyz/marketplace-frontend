import { bootstrap } from "core/bootstrap";
import { Hackathon } from "core/domain/hackathon/models/hackathon-modal";
import { notFound } from "next/navigation";

import { Header } from "app/hackathons/[hackathonSlug]/components/header/header";

import { Paper } from "components/atoms/paper";

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
    <div className={"flex gap-4"}>
      <div className={"flex-1"}>
        <Header hackathonSlug={params.hackathonSlug} />
        <Paper size={"m"}>{hackathon.title}</Paper>
      </div>
      {/*<aside>Sidebar</aside>*/}
    </div>
  );
}
