import { ComponentType, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  param: string;
}

type DataSwitchProps = {
  children: ReactNode;
  param: string;
  ApolloDataWrapper: ComponentType<WrapperProps>;
  ReactQueryDataWrapper: ComponentType<WrapperProps>;
};

export default function DataSwitch({ children, param, ApolloDataWrapper, ReactQueryDataWrapper }: DataSwitchProps) {
  const useApollo = import.meta.env.VITE_USE_APOLLO === "true";

  const projectKey = param;

  return useApollo ? (
    <ApolloDataWrapper param={projectKey}>{children}</ApolloDataWrapper>
  ) : (
    <ReactQueryDataWrapper param={projectKey}>{children}</ReactQueryDataWrapper>
  );
}
