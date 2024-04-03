"use client";

import MaintenanceAnimation from "src/assets/animations/Maintenance";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";

export default function MaintenancePage() {
  const { T } = useIntl();

  return (
    <div className="flex min-h-[calc(100dvh)] flex-col items-center justify-center gap-12 px-4 text-center">
      <div className="-mb-20 -mt-20 w-72 stroke-white">
        <MaintenanceAnimation />
      </div>
      <div className="flex flex-col gap-6 sm:w-110">
        <div className="font-belwe text-3xl font-normal text-greyscale-50">{T("state.maintenance.title")}</div>
        <div className="px-3.5 font-walsheim text-lg font-normal text-spaceBlue-200">
          {T("state.maintenance.description")}
        </div>
      </div>

      <a href="https://onlydust.com" rel="noreferrer">
        <Button as={"span"} size={"l"}>
          {T("state.maintenance.visitButton")}
        </Button>
      </a>
    </div>
  );
}
