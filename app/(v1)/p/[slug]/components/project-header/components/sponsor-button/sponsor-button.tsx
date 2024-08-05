import { useMemo } from "react";

import SponsorApi from "src/api/Sponsors";

import { SponsorSidePanels } from "components/features/sponsor/sponsor-side-panels";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TSponsorButton } from "./sponsor-button.types";

export function SponsorButton({ project }: TSponsorButton.Props) {
  const { user } = useCurrentUser();
  const { sponsors } = user ?? {};
  const [sponsor] = sponsors ?? [];
  const { id: sponsorId } = sponsor ?? {};

  const sponsorIdIsString = typeof sponsorId === "string";

  const { data } = SponsorApi.queries.useGetSponsorById({
    params: {
      sponsorId: sponsorIdIsString ? sponsorId : "",
    },
    options: {
      enabled: sponsorIdIsString,
    },
  });

  const canSponsorProject = useMemo(() => data?.availableBudgets.filter(b => Boolean(b.amount))?.length, [data]);
  return (
    <SponsorSidePanels
      panel={canSponsorProject ? "project" : "fillout"}
      project={project}
      buttonProps={{
        backgroundColor: "blue",
        size: "s",
        className: "flex-1 md:flex-initial",
        children: (
          <>
            <Icon remixName="ri-service-line" />
            <Translate token="v2.pages.project.details.header.buttons.sponsor" />
          </>
        ),
      }}
    />
  );
}
