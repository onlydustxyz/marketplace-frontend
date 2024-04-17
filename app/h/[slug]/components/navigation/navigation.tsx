import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";

import { Tabs as TabsComponent } from "components/ds/tabs/tabs";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { TNavigation } from "./navigation.types";

export function Navigation({ slug }: TNavigation.Props) {
  return (
    <div className="h-auto w-full bg-card-background-base pt-6">
      <Wrapper>
        <TabsComponent
          isHref={true}
          border={false}
          tabs={[
            {
              content: <Translate token="v2.pages.settings.hackathons.details.navigation.overview" />,
              key: NEXT_ROUTER.hackathons.details.root(slug),
            },
            {
              content: <Translate token="v2.pages.settings.hackathons.details.navigation.tracks" />,
              key: NEXT_ROUTER.hackathons.details.tracks(slug),
            },
          ]}
        />
      </Wrapper>
    </div>
  );
}
