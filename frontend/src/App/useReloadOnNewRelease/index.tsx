import { useState } from "react";
import { useGetReleaseDateLazyQuery } from "src/__generated/graphql";
import { cacheHeader } from "src/utils/headers";

export default function useReloadOnNewRelease() {
  const [initialLoadTime] = useState(new Date().getTime());

  const [reloadOnNewRelease] = useGetReleaseDateLazyQuery({
    fetchPolicy: "network-only",
    context: { graphqlErrorDisplay: "none", headers: { ...cacheHeader } },
    onCompleted: ({ releaseDate }) => {
      if (new Date(releaseDate).getTime() > initialLoadTime) {
        window.location.reload();
      }
    },
  });

  return reloadOnNewRelease;
}
