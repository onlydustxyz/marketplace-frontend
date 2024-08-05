import { useParams } from "next/navigation";

import SponsorApi from "src/api/Sponsors";

export function useSponsorDetail() {
  const { sponsorId } = useParams();

  const sponsorIdIsString = typeof sponsorId === "string";

  return SponsorApi.queries.useGetSponsorById({
    params: {
      sponsorId: sponsorIdIsString ? sponsorId : "",
    },
    options: {
      enabled: sponsorIdIsString,
    },
  });
}
