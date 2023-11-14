import { useCallback } from "react";
import MeApi from "src/api/me";
import { UseGetUserMeResponse } from "src/api/me/queries";

export interface UseProjectLeaderProps {
  slug?: string;
  id?: string;
}

const Condition = (user: UseGetUserMeResponse | undefined, { slug, id }: UseProjectLeaderProps) => {
  if (slug) {
    return !!user?.projectLedIds?.find(p => p.slug === slug);
  }

  if (id) {
    return !!user?.projectLedIds?.find(p => p.id === id);
  }

  return false;
};

export const useLeadProjects = (): boolean => {
  const { data: userInfo } = MeApi.queries.useGetMe({});

  if (userInfo?.projectLedIds?.length) {
    return true;
  }

  return false;
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
