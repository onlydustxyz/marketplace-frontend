import { InView } from "react-intersection-observer";
import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";

export function LoadMore({ onLoadMore, loading }: { onLoadMore: () => void; loading: boolean }) {
  const { T } = useIntl();

  return (
    <InView
      className="flex justify-center px-4 py-2 text-spacePurple-500"
      onChange={inView => {
        if (inView) onLoadMore();
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <button onClick={onLoadMore} className="flex items-center gap-2 font-walsheim text-sm font-medium">
          <ArrowDownSLine className="text-base" />
          <span>{T("showMore")}</span>
        </button>
      )}
    </InView>
  );
}
