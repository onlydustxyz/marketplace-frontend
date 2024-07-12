import Link from "next/link";

import { THeader } from "app/hackathons/[hackathonSlug]/components/header/header.types";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function Header({ hackathonSlug }: THeader.Props) {
  return (
    <header className={"flex items-center justify-between py-4"}>
      <Button
        as={Link}
        htmlProps={{ href: NEXT_ROUTER.hackathons.root }}
        variant={"secondary-light"}
        size={"m"}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
        translate={{ token: "v2.pages.hackathons.details.header.back" }}
      />

      <Typo as={"div"} size={"m"} color={"text-3"} classNames={{ base: "flex items-center" }}>
        <Translate token={"v2.pages.hackathons.details.header.hackathon"} />
        <Icon remixName={"ri-arrow-right-s-line"} />
        <span className={"text-text-1"}>{hackathonSlug}</span>
      </Typo>
    </header>
  );
}
