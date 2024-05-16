"use client";

import { useRouter } from "next/navigation";

import OnlyDustCrashedLogo from "src/assets/icons/OnlyDustCrashedLogo";

import { Button } from "components/ds/button/button";
import { Link } from "components/ds/link/link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export default function Error() {
  const { T } = useIntl();
  const router = useRouter();

  const [descStart, descLink, descEnd] = T("v2.commons.globalState.error.description").split("_");

  return (
    <div className={"m-auto grid w-full max-w-lg place-items-center gap-12 px-10"}>
      <OnlyDustCrashedLogo />

      <div className="grid gap-4 text-center">
        <Typography variant={"title-l"}>{T("v2.commons.globalState.error.title")}</Typography>
        <Typography variant={"body-l"} className={"text-greyscale-100"}>
          {descStart}
          <a className="underline" href={"mailto:contact@onlydust.xyz"}>
            {descLink}
          </a>
          {descEnd}
        </Typography>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href={NEXT_ROUTER.projects.all}>
          <Button as={"div"} variant={"secondary"} className={"w-full"}>
            <Icon remixName={"ri-arrow-left-s-line"} size={20} /> {T("v2.commons.globalState.error.back")}
          </Button>
        </Link>

        <Button onClick={router.refresh} className={"w-full"}>
          <Icon remixName={"ri-refresh-line"} size={20} /> {T("v2.commons.globalState.error.refresh")}
        </Button>
      </div>
    </div>
  );
}
