import { isString } from "lodash";
import { useParams } from "next/navigation";

import SponsorApi from "src/api/Sponsors";

export function useSponsorHistory() {
  const { sponsorId } = useParams();
  const sponsorIdIsString = isString(sponsorId);

  return SponsorApi.queries.useGetSponsorTransactions({
    params: {
      sponsorId: sponsorIdIsString ? sponsorId : "",
    },
    options: {
      enabled: sponsorIdIsString,
    },
  });
}
