import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";

import { Tabs as TabsComponent } from "components/ds/tabs/tabs";
import { ClientOnly } from "components/layout/client-only/client-only";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { TNavigation } from "./navigation.types";

export function Navigation({ slug, hasTracks }: TNavigation.Props) {
  return (
    <div className="h-auto w-full bg-card-background-base pt-6">
      <Wrapper className="max-md:px-0">
        <ClientOnly>
          <TabsComponent
            isHref={true}
            border={false}
            tabs={[
              {
                content: <Translate token="v2.pages.hackathons.details.navigation.overview" />,
                key: NEXT_ROUTER.hackathons.details.root(slug),
              },
              ...(hasTracks
                ? [
                    {
                      content: <Translate token="v2.pages.hackathons.details.navigation.tracks" />,
                      key: NEXT_ROUTER.hackathons.details.tracks(slug),
                    },
                  ]
                : []),
            ]}
          />
        </ClientOnly>
      </Wrapper>
    </div>
  );
}
