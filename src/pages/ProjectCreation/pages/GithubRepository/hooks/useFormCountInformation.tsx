import { useMemo } from "react";
import { GithubRepositoryCount } from "../components/GithubRepositoryCount";
import { GithubRepositoryCountError } from "../components/GithubRepositoryCountError";

export const useFormCountInformation = (selected: number, total: number) => {
  return useMemo(() => {
    if (selected === 0) {
      return <GithubRepositoryCountError />;
    }

    return <GithubRepositoryCount total={total} selected={selected} />;
  }, [selected, total]);
};
