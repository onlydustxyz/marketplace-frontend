import { useIntl } from "src/hooks/useIntl";
import emptyStateLogo from "assets/img/empty-state.png";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const EmptyState: React.FC<Props> = () => {
  const { T } = useIntl();

  return (
    <div className="p-12 flex flex-col gap-2 bg-white/2 rounded-2xl items-center">
      <div className="mb-6">
        <img src={emptyStateLogo}></img>
      </div>
      <div className="font-belwe text-2xl font-normal text-greyscale-50">
        {T("payment.form.workItems.emptyState.title")}
      </div>
      <div className="font-walsheim text-base font-normal text-greyscale-50">
        {T("payment.form.workItems.emptyState.subtitle")}
      </div>
    </div>
  );
};

export default EmptyState;
