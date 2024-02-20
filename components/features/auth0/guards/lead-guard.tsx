import { useParams, useRouter } from "next/navigation";
import { ComponentType, FC, useEffect } from "react";

import MeApi from "src/api/me";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

import { NEXT_ROUTER } from "constants/router";

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

export { withLeadRequired };
