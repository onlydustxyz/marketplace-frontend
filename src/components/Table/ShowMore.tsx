import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";

export function ShowMore({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  const { T } = useIntl();

  return (
    <div className="flex justify-center px-4 py-2 text-spacePurple-500">
      {loading ? (
        <Spinner />
      ) : (
        <button onClick={onClick} className="flex items-center gap-2 font-walsheim text-sm font-medium">
          <ArrowDownSLine className="text-base" />
          <span>{T("showMore")}</span>
        </button>
      )}
    </div>
  );
}
