import { Fragment } from "react";

import { Avatar } from "components/ds/avatar/avatar";
import { Link } from "components/ds/link/link";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TSponsors } from "./sponsors.types";

export function Sponsors({ sponsors }: TSponsors.Props) {
  if (!sponsors?.length) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.sponsors",
        params: { count: sponsors.length },
      }}
      remixIconName="ri-service-line"
    >
      <Flex wrap="wrap" className="gap-3">
        {sponsors.map(sponsor => (
          <Fragment key={sponsor.id}>
            {sponsor.url ? (
              <Link href={sponsor.url} className="gap-2">
                <Avatar src={sponsor.logoUrl} alt={sponsor.name} size="s" />

                <Typography variant="body-s" className="truncate">
                  {sponsor.name}
                </Typography>
              </Link>
            ) : (
              <Flex alignItems="center" className="gap-2">
                <Avatar src={sponsor.logoUrl} alt={sponsor.name} size="s" />

                <Typography variant="body-s" className="truncate">
                  {sponsor.name}
                </Typography>
              </Flex>
            )}
          </Fragment>
        ))}
      </Flex>
    </Section>
  );
}
