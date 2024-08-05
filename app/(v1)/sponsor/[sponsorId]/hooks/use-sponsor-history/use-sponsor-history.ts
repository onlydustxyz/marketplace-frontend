import { useParams } from "next/navigation";

import { TUseSponsorHistory } from "app/(v1)/sponsor/[sponsorId]/hooks/use-sponsor-history/use-sponsor-history.types";

import SponsorApi from "src/api/Sponsors";

export function useSponsorHistory(props?: TUseSponsorHistory.Props) {
  const { queryParams } = props ?? {};

  const { sponsorId } = useParams();

  const sponsorIdIsString = typeof sponsorId === "string";

  return SponsorApi.queries.useGetSponsorTransactions({
    params: {
      sponsorId: sponsorIdIsString ? sponsorId : "",
      queryParams,
    },
    options: {
      enabled: sponsorIdIsString,
    },
  });
}
