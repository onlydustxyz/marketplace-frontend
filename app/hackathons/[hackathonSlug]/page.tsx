import { Header } from "app/hackathons/[hackathonSlug]/components/header/header";

import { Paper } from "components/atoms/paper";

export default function HackathonPage({ params }: { params: { hackathonSlug: string } }) {
  return (
    <>
      <Header hackathonSlug={params.hackathonSlug} />
      <Paper size={"m"}>Content</Paper>
    </>
  );
}
