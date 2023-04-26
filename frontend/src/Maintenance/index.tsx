import { useIntl } from "src/hooks/useIntl";
import Button from "src/components/Button";
import Refresh from "src/icons/Refresh";
import MaintenanceAnimation from "src/assets/animations/Maintenance";

export default function Maintenance() {
  const { T } = useIntl();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-12">
      <div className="w-72 -mb-20 stroke-white">
        <MaintenanceAnimation />
      </div>
      <div className="flex flex-col gap-6 w-110">
        <div className="font-normal font-belwe text-3xl text-greyscale-50">{T("state.maintenance.title")}</div>
        <div className="font-normal font-walsheim text-lg text-spaceBlue-200 px-3.5">
          {T("state.maintenance.description")}
        </div>
      </div>
      <Button onClick={window.location.reload}>
        <Refresh className="text-xl" /> {T("state.maintenance.refresh")}
      </Button>
    </div>
  );
}
