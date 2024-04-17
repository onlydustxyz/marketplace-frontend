import { isString } from "lodash";
import { useParams } from "next/navigation";

import { TUseSponsorHistory } from "app/sponsor/[sponsorId]/hooks/use-sponsor-history.types";

import SponsorApi from "src/api/Sponsors";

export function useSponsorHistory(props?: TUseSponsorHistory.Props) {
  const { queryParams } = props ?? {};

  const { sponsorId } = useParams();
  const sponsorIdIsString = isString(sponsorId);

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
