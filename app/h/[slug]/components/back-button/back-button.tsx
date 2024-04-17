import Link from "next/link";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";

import { NEXT_ROUTER } from "constants/router";

export function BackButton() {
  return (
    <Link href={NEXT_ROUTER.hackathons.root}>
      <Button iconOnly variant={"secondary"} size={"s"}>
        <Icon remixName={"ri-arrow-left-s-line"} />
      </Button>
    </Link>
  );
}
