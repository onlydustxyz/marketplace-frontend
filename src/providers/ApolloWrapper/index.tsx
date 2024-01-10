import { PropsWithChildren, useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, SuspenseCache, disableFragmentWarnings } from "@apollo/client";
import useApolloLink from "./links";
import useApolloCache from "./cache";
import config from "src/config";
import { useAuth0 } from "@auth0/auth0-react";

disableFragmentWarnings();

export default function ApolloWrapper({ children }: PropsWithChildren) {
  const link = useApolloLink();
  const cache = useApolloCache();
  const suspenseCache = new SuspenseCache();
  const { isAuthenticated } = useAuth0();

  const [client] = useState(
    () => new ApolloClient({ link, cache, connectToDevTools: config.ENVIRONMENT !== "production" })
  );

  // Update the link whenever the accessToken changes
  client.setLink(link);

  useEffect(() => {
    client.resetStore();
  }, [isAuthenticated]);

  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      {children}
    </ApolloProvider>
  );
}
