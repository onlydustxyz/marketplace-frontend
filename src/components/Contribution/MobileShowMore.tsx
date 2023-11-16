import { InView } from "react-intersection-observer";
import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";

export function MobileShowMore({
  onClick,
  loading,
  isInfinite = true,
}: {
  onClick: () => void;
  loading: boolean;
  isInfinite?: boolean;
}) {
  const { T } = useIntl();

  return (
    <InView
      onChange={inView => {
        if (inView) onClick();
      }}
      skip={!isInfinite}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center rounded-xl border border-greyscale-50 bg-white/5 px-4 py-3.5 font-walsheim font-medium leading-none text-greyscale-50 shadow-lg"
        disabled={loading}
      >
        {loading ? (
          <Spinner variant="greyscale" />
        ) : (
          <span className="flex items-center gap-2 leading-6">
            <ArrowDownSLine className="text-base" />
            {T("showMore")}
          </span>
        )}
      </button>
    </InView>
  );
}
