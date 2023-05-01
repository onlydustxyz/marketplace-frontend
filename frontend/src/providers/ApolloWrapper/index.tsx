import { PropsWithChildren } from "react";
import { ApolloClient, ApolloProvider, SuspenseCache, disableFragmentWarnings } from "@apollo/client";
import useApolloLink from "./links";
import useApolloCache from "./cache";

disableFragmentWarnings();

export default function ApolloWrapper({ children }: PropsWithChildren) {
  const link = useApolloLink();
  const cache = useApolloCache();

  const client = new ApolloClient({
    link,
    cache,
  });

  const suspenseCache = new SuspenseCache();

  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      {children}
    </ApolloProvider>
  );
}
