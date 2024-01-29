"use client";

import { BasePaginatedParams } from "actions/type.actions";
import { useState } from "react";
import { InView } from "react-intersection-observer";

import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";

import { LoadMoreProps } from "./load-more.type";

export function LoadMore<PARAMS extends BasePaginatedParams = BasePaginatedParams>({
  params,
  onFetchMore,
  hasMore,
}: LoadMoreProps<PARAMS>) {
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [children, setChildren] = useState<JSX.Element>(<></>);
  const { T } = useIntl();

  const handleLoadMore = async () => {
    if (!hasFetched && hasMore) {
      setLoading(true);
      const child = await onFetchMore(params);
      setChildren(child);
      setLoading(false);
      setHasFetched(true);
    }
  };

  return (
    <>
      {children}
      {hasMore && !hasFetched ? (
        <InView
          className="flex justify-center px-4 py-2 text-spacePurple-500"
          onChange={inView => {
            if (inView) handleLoadMore();
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <button onClick={handleLoadMore} className="flex items-center gap-2 font-walsheim text-sm font-medium">
              <ArrowDownSLine className="text-base" />
              <span>{T("showMore")}</span>
            </button>
          )}
        </InView>
      ) : null}
    </>
  );
}
