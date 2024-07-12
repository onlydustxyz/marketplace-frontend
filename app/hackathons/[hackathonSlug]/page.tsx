import { Header } from "app/hackathons/[hackathonSlug]/components/header/header";

import { Paper } from "components/atoms/paper";

export default function HackathonPage({ params }: { params: { hackathonSlug: string } }) {
  return (
    <div className={"flex gap-4"}>
      <div className={"flex-1"}>
        <Header hackathonSlug={params.hackathonSlug} />
        <Paper size={"m"}>Content</Paper>
      </div>
      {/*<aside>Sidebar</aside>*/}
    </div>
  );
}
