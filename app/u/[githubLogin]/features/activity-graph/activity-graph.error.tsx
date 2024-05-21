import { IMAGES } from "src/assets/img";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Typography } from "components/layout/typography/typography";

export function ActivityGraphError() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Typography variant="title-m" className="flex-1" translate={{ token: "v2.pages.publicProfile.activity.title" }} />
      <Card background={"base"}>
        <EmptyState
          illustrationSrc={IMAGES.icons.compass}
          title={{ token: "v2.pages.publicProfile.activity.empty.title" }}
          description={{ token: "v2.pages.publicProfile.activity.empty.description" }}
        />
      </Card>
    </div>
  );
}
