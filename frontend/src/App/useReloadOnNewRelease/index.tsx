import { useState } from "react";
import { useGetReleaseDateLazyQuery } from "src/__generated/graphql";

export default function useReloadOnNewRelease() {
  const [initialLoadTime] = useState(new Date().getTime());

  const [reloadOnNewRelease] = useGetReleaseDateLazyQuery({
    fetchPolicy: "network-only",
    context: { graphqlErrorDisplay: "none" },
    onCompleted: ({ releaseDate }) => {
      if (new Date(releaseDate).getTime() > initialLoadTime) {
        window.location.reload();
      }
    },
  });

  return reloadOnNewRelease;
}
