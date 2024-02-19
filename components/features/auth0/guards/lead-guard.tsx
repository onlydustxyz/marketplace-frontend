import { useParams, useRouter } from "next/navigation";
import { ComponentType, FC, ReactElement, useEffect } from "react";
import { Navigate, generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";
import MeApi from "src/api/me";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

import { NEXT_ROUTER } from "constants/router";

function LeadGuard({ children }: { children: ReactElement }) {
  const { isLoading, isRefetching } = MeApi.queries.useGetMe({});
  const params = useParams<{ slug: string }>();
  const isProjectLeader = useProjectLeader({ slug: params.slug });

  if (isLoading || isRefetching) {
    return null;
  }

  return isProjectLeader ? <>{children}</> : <Navigate to={generatePath(RoutePaths.NotFound, params)} />;
}

const withLeadRequired = <P extends object>(Component: ComponentType<P>): FC<P> => {
  // eslint-disable-next-line react/display-name
  return (props: P): JSX.Element => {
    const router = useRouter();
    const { isLoading, isRefetching } = MeApi.queries.useGetMe({});
    const params = useParams<{ slug: string }>();
    const isProjectLeader = useProjectLeader({ slug: params.slug });

    useEffect(() => {
      if (isLoading || isRefetching || isProjectLeader) return;
      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isRefetching, isProjectLeader]);

    if (isLoading || isRefetching) {
      return <></>;
    }

    return isProjectLeader ? <Component {...props} /> : <></>;
  };
};

export { LeadGuard, withLeadRequired };
