import { ReactNode } from "react";
import { useQuery } from "react-query";
import { useTokenSet } from "src/hooks/useTokenSet";
import DataDisplay from "./DataDisplay";

export interface ReactQueryDataWrapperProps {
  children: ReactNode;
  projectKey: string;
}

// this component will evolve soon to take API basepath, params and other inputs as props to be fully reusable
export default function ReactQueryDataWrapper({ children, projectKey }: ReactQueryDataWrapperProps) {
  const { tokenSet } = useTokenSet();
  const apiBasepath = import.meta.env.VITE_ONLYDUST_API_BASEPATH;
  const resource = "/api/v1/projects/slug/";
  const param = projectKey;
  const url = `${apiBasepath}${resource}${param}`;
  const option = tokenSet?.accessToken
    ? {
        headers: {
          Authorization: `Bearer ${tokenSet.accessToken}`,
        },
      }
    : {};

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(`https://${url}`, option).then(res => res.json()),
  });

  return (
    <DataDisplay projectKey={projectKey} data={data} isLoading={isLoading} error={error}>
      {children}
    </DataDisplay>
  );
}
