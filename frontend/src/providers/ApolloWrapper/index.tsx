import { PropsWithChildren, useState } from "react";
import { ApolloClient, ApolloProvider, SuspenseCache, disableFragmentWarnings } from "@apollo/client";
import useApolloLink from "./links";
import useApolloCache from "./cache";

disableFragmentWarnings();

export default function ApolloWrapper({ children }: PropsWithChildren) {
  const link = useApolloLink();
  const cache = useApolloCache();
  const suspenseCache = new SuspenseCache();

  const [client] = useState(() => new ApolloClient({ link, cache }));

  // Update the link whenever the accessToken changes
  client.setLink(link);

  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      {children}
    </ApolloProvider>
  );
}
