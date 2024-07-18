import Link from "next/link";

import { THeader } from "app/hackathons/[hackathonSlug]/components/header/header.types";

import { Breadcrumbs } from "components/atoms/breadcrumbs";
import { Button } from "components/atoms/button/variants/button-default";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function Header({ hackathonSlug }: THeader.Props) {
  return (
    <header className={"flex items-center justify-between"}>
      <Button
        as={Link}
        htmlProps={{ href: NEXT_ROUTER.hackathons.root }}
        variant={"secondary-light"}
        size={"m"}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
        translate={{ token: "v2.pages.hackathons.details.header.back" }}
      />

      {hackathonSlug ? (
        <Breadcrumbs
          items={[
            {
              id: "hackathons_list",
              label: <Translate token={"v2.pages.hackathons.details.header.hackathons"} />,
              href: NEXT_ROUTER.hackathons.root,
            },

            {
              id: "current_hackathon",
              label: hackathonSlug,
            },
          ]}
        />
      ) : null}
    </header>
  );
}
