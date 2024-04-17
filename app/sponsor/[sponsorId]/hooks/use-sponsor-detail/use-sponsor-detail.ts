import { isString } from "lodash";
import { useParams } from "next/navigation";

import SponsorApi from "src/api/Sponsors";

export function useSponsorDetail() {
  const { sponsorId } = useParams();

  const sponsorIdIsString = isString(sponsorId);

  return SponsorApi.queries.useGetSponsorById({
    params: {
      sponsorId: sponsorIdIsString ? sponsorId : "",
    },
    options: {
      enabled: sponsorIdIsString,
    },
  });
}
