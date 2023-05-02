import { PropsWithChildren, useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, SuspenseCache, disableFragmentWarnings } from "@apollo/client";
import useApolloLink from "./links";
import useApolloCache from "./cache";
import { useRoles } from "src/hooks/useAuth/useRoles";

disableFragmentWarnings();

export default function ApolloWrapper({ children }: PropsWithChildren) {
  const link = useApolloLink();
  const cache = useApolloCache();
  const suspenseCache = new SuspenseCache();
  const { isLoggedIn } = useRoles();

  const [client] = useState(() => new ApolloClient({ link, cache }));

  // Update the link whenever the accessToken changes
  client.setLink(link);

  useEffect(() => {
    client.resetStore();
  }, [isLoggedIn]);

  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      {children}
    </ApolloProvider>
  );
}
