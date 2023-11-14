import { useCallback } from "react";
import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import { UseGetUserMeResponse } from "src/api/me/queries";

export interface UseProjectLeaderProps {
  slug?: string;
  id?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    LEAD                                    */
/* -------------------------------------------------------------------------- */
const Condition = (user: UseGetUserMeResponse | undefined, { slug, id }: UseProjectLeaderProps) => {
  if (slug) {
    return !!user?.projectsLed?.find(p => p.slug === slug);
  }

  if (id) {
    return !!user?.projectsLed?.find(p => p.id === id);
  }

  return false;
};

export const useLeadProjects = (): components["schemas"]["ProjectLedShortResponse"][] => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  if (userInfo?.projectsLed?.length) {
    return userInfo?.projectsLed;
  }

  return [];
};

export const useLazyProjectLeader = (): ((p: { slug?: string; id?: string }) => boolean) => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  const check = useCallback(
    ({ slug, id }: UseProjectLeaderProps): boolean => {
      return Condition(userInfo, { slug, id });
    },
    [userInfo]
  );

  return check;
};

export const useProjectLeader = ({ slug, id }: UseProjectLeaderProps): boolean => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  return Condition(userInfo, { slug, id });
};

/* -------------------------------------------------------------------------- */
/*                                   PENDING                                  */
/* -------------------------------------------------------------------------- */

const PendingCondition = (user: UseGetUserMeResponse | undefined, { slug, id }: UseProjectLeaderProps) => {
  if (slug) {
    return !!user?.pendingProjectsLed?.find(p => p.slug === slug);
  }

  if (id) {
    return !!user?.pendingProjectsLed?.find(p => p.id === id);
  }

  return false;
};

export const usePendingLeadProjects = (): components["schemas"]["ProjectLedShortResponse"][] => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  if (userInfo?.pendingProjectsLed?.length) {
    return userInfo?.pendingProjectsLed;
  }

  return [];
};

export const useLazyPendingProjectLeader = (): ((p: { slug?: string; id?: string }) => boolean) => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  const check = useCallback(
    ({ slug, id }: UseProjectLeaderProps): boolean => {
      return PendingCondition(userInfo, { slug, id });
    },
    [userInfo]
  );

  return check;
};

export const usePendingProjectLeader = ({ slug, id }: UseProjectLeaderProps): boolean => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  return PendingCondition(userInfo, { slug, id });
};
