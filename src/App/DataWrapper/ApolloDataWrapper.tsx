import { ReactNode } from "react";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { GetProjectIdFromKeyDocument, GetProjectIdFromKeyQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";
import DataDisplay from "./DataDisplay";

interface ApolloDataWrapperProps {
  children: ReactNode;
  param: string;
}

export default function ApolloDataWrapper({ children, param }: ApolloDataWrapperProps) {
  const projectIdQuery = useSuspenseQuery<GetProjectIdFromKeyQuery>(GetProjectIdFromKeyDocument, {
    variables: { projectKey: param },
    ...contextWithCacheHeaders,
  });

  return (
    <DataDisplay param={param} data={projectIdQuery.data?.projects[0]}>
      {children}
    </DataDisplay>
  );
}
