import { ReactQueryDataWrapperProps } from "./ReactQueryDataWrapper";
import ReactQueryDataWrapper from "./ReactQueryDataWrapper";
import ApolloDataWrapper from "./ApolloDataWrapper";

type DataSwitchProps = ReactQueryDataWrapperProps;

export default function DataSwitch({ children, projectKey }: DataSwitchProps) {
  const useApollo = import.meta.env.VITE_USE_APOLLO === "true";

  return useApollo ? (
    <ApolloDataWrapper projectKey={projectKey}>{children}</ApolloDataWrapper>
  ) : (
    <ReactQueryDataWrapper projectKey={projectKey}>{children}</ReactQueryDataWrapper>
  );
}
