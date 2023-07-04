import { useIntl } from "src/hooks/useIntl";
import MaintenanceAnimation from "src/assets/animations/Maintenance";
import Button from "src/components/Button";

export default function Maintenance() {
  const { T } = useIntl();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 text-center">
      <div className="-mb-20 -mt-20 w-72 stroke-white">
        <MaintenanceAnimation />
      </div>
      <div className="flex w-110 flex-col gap-6">
        <div className="font-belwe text-3xl font-normal text-greyscale-50">{T("state.maintenance.title")}</div>
        <div className="px-3.5 font-walsheim text-lg font-normal text-spaceBlue-200">
          {T("state.maintenance.description")}
        </div>
      </div>
      <a href="https://onlydust.xyz" rel="noreferrer">
        <Button>{T("state.maintenance.visitButton")}</Button>
      </a>
    </div>
  );
}
