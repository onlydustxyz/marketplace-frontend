import { Avatar } from "components/ds/avatar/avatar";
import { Link } from "components/ds/link/link";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TSponsors } from "./sponsors.types";

export function Sponsors({ sponsors }: TSponsors.Props) {
  if (sponsors?.length === 0) {
    return null;
  }

  return (
    <Section
      title={{
        token: "project.details.overview.sponsors",
        params: { count: sponsors?.length || 0 },
      }}
      remixIconName="ri-service-line"
    >
      <Flex wrap="wrap" className="gap-1">
        {sponsors?.map(sponsor => (
          <Link key={sponsor.id} href={sponsor.url} className="gap-2">
            <Avatar src={sponsor.logoUrl} alt={sponsor.name} size="s" />

            <Typography variant="body-s" className="truncate">
              {sponsor.name}
            </Typography>
          </Link>
        ))}
      </Flex>
    </Section>
  );
}
