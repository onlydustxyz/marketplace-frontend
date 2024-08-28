import { Fragment } from "react";

import { TPrograms } from "app/p/[slug]/features/project-details/components/programs/programs.types";
import { Section } from "app/p/[slug]/features/project-details/components/section/section";

import { Avatar } from "components/ds/avatar/avatar";
import { Link } from "components/ds/link/link";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function Programs({ programs }: TPrograms.Props) {
  if (!programs?.length) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.programs",
        params: { count: programs.length },
      }}
      remixIconName="ri-service-line"
    >
      <Flex wrap="wrap" className="gap-3">
        {programs.map(program => (
          <Fragment key={program.id}>
            {program.url ? (
              <Link href={program.url} className="gap-2">
                <Avatar src={program.logoUrl} alt={program.name} size="s" />

                <Typography variant="body-s" className="truncate">
                  {program.name}
                </Typography>
              </Link>
            ) : (
              <Flex alignItems="center" className="gap-2">
                <Avatar src={program.logoUrl} alt={program.name} size="s" />

                <Typography variant="body-s" className="truncate">
                  {program.name}
                </Typography>
              </Flex>
            )}
          </Fragment>
        ))}
      </Flex>
    </Section>
  );
}
