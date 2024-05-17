import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

export function ActivityGraphError() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Typography variant="title-m" className="flex-1" translate={{ token: "v2.pages.publicProfile.activity.title" }} />
      <Card background={"base"}>
        <Typography variant="body-m" translate={{ token: "v2.pages.publicProfile.activity.error" }} />
      </Card>
    </div>
  );
}
