"use client";

import Countdown from "react-countdown";
import { isInMaintenanceMode } from "utils/maintenance/maintenance";

import { withMaintenanceEnabled } from "app/(v1)/maintenance/features/guard/maintenance-guard";

import { IMAGES } from "src/assets/img";

import { Button } from "components/ds/button/button";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

function MaintenancePage() {
  const { endsAt } = isInMaintenanceMode();

  return (
    <div className="flex min-h-[calc(90dvh)] flex-col items-center justify-center px-4 text-center">
      <div className="w-72 stroke-white">
        <img src={IMAGES.logo.original} alt={"logo"} />
      </div>

      <div className={"grid justify-items-center gap-8"}>
        <div className="grid gap-4">
          <Typography variant={"title-l"} translate={{ token: "state.maintenance.title" }} />
          <Typography
            variant={"body-l"}
            className={"text-spaceBlue-200"}
            translate={{ token: "state.maintenance.description" }}
          />
        </div>

        {endsAt ? (
          <Countdown
            date={endsAt}
            renderer={({ completed, formatted: { hours, minutes, seconds } }) => {
              if (completed) {
                return (
                  <Typography
                    variant={"body-l"}
                    className={"text-spaceBlue-50"}
                    translate={{ token: "state.maintenance.overtime" }}
                  />
                );
              }

              return (
                <Typography as={"span"} variant={"title-l"}>
                  {hours}:{minutes}:{seconds}
                </Typography>
              );
            }}
          />
        ) : null}

        <a href="https://onlydust.com" rel="noreferrer">
          <Button as={"span"} size={"l"}>
            <Translate token={"state.maintenance.visitButton"} />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default withClientOnly(withMaintenanceEnabled(MaintenancePage));
