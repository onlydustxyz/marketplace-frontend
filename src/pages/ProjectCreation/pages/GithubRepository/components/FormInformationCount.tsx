import { useMemo } from "react";
import { GithubRepositoryCount } from "./GithubRepositoryCount";
import { GithubRepositoryCountError } from "./GithubRepositoryCountError";

export const FormInformationCount = (selected: number, total: number) => {
  return useMemo(() => {
    if (selected === 0) {
      return <GithubRepositoryCountError />;
    }

    return <GithubRepositoryCount total={total} selected={selected} />;
  }, [selected, total]);
};
