import { Header } from "app/hackathons/[hackathonSlug]/components/header/header";

import { Paper } from "components/atoms/paper";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export default function LoadingHackathonPage() {
  return (
    <div className={"flex gap-4"}>
      <div className={"flex-1"}>
        <Header />
        <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-4" }}>
          <SkeletonEl variant={"rounded"} width={"100%"} height={246} />
          <SkeletonEl variant={"rounded"} width={"100%"} height={92} />
          <SkeletonEl variant={"rounded"} width={"100%"} height={92} />
          <SkeletonEl variant={"rounded"} width={"100%"} height={246} />
        </Paper>
      </div>
      {/*<aside>Sidebar</aside>*/}
    </div>
  );
}
