import { ComponentType, ReactNode } from "react";
import ReactQueryDataWrapper from "src/App/DataWrapper/ReactQueryDataWrapper";

type QueryParam = {
  key: string;
  value: string[];
};
interface WrapperProps {
  children: ReactNode;
  param?: string;
  resourcePath?: string;
  queryParams?: QueryParam[];
}

type DataSwitchProps = {
  children: ReactNode;
  param?: string;
  ApolloDataWrapper: ComponentType<WrapperProps>;
  resourcePath?: string;
  queryParams?: QueryParam[];
};

export default function DataSwitch({ children, param, ApolloDataWrapper, resourcePath, queryParams }: DataSwitchProps) {
  const useApollo = import.meta.env.VITE_USE_APOLLO === "true";
  const projectKey = param;

  return useApollo ? (
    <ApolloDataWrapper param={projectKey}>{children}</ApolloDataWrapper>
  ) : (
    <ReactQueryDataWrapper param={projectKey} resourcePath={resourcePath} queryParams={queryParams}>
      {children}
    </ReactQueryDataWrapper>
  );
}
