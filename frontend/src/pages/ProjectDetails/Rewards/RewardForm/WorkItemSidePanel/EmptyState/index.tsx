import { useIntl } from "src/hooks/useIntl";
import emptyStateLogo from "assets/img/empty-state.png";

export default function EmptyState() {
  const { T } = useIntl();

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/2 p-12">
      <div className="mb-6">
        <img src={emptyStateLogo}></img>
      </div>
      <div className="text-center font-belwe text-2xl font-normal text-greyscale-50">
        {T("reward.form.contributions.emptyState.title")}
      </div>
      <div className="text-center font-walsheim text-base font-normal text-greyscale-50">
        {T("reward.form.contributions.emptyState.subtitle")}
      </div>
    </div>
  );
}
