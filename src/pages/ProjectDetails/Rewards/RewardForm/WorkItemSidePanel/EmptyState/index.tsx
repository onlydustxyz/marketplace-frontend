import { useIntl } from "src/hooks/useIntl";
import emptyStateLogo from "assets/img/empty-state.png";
import { getFormattedTimeUS } from "src/utils/date";

type EmptyStateProps = {
  indexedAt: string;
};

export default function EmptyState({ indexedAt }: EmptyStateProps) {
  const { T } = useIntl();
  const isoDate = new Date(indexedAt + "Z");

  return indexedAt ? (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/2 p-12">
      <div className="mb-6">
        <img src={emptyStateLogo}></img>
      </div>
      <div className="text-center font-belwe text-2xl font-normal text-greyscale-50">
        {T("reward.form.contributions.emptyState.title")}
      </div>
      <div className="text-center font-walsheim text-base font-normal text-greyscale-50">
        {T("reward.form.contributions.emptyState.subtitle", {
          time: getFormattedTimeUS(isoDate),
        })}
      </div>
    </div>
  ) : null;
}
