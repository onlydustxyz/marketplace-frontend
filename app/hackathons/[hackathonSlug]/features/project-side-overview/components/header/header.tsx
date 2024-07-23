"use client";

import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { THeader } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/header/header.types";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

export function Header({ slug, logoUrl }: THeader.Props) {
  const {
    project: { close },
  } = useContext(HackathonContext);

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="secondary-light"
        as={BaseLink}
        htmlProps={{
          href: NEXT_ROUTER.projects.details.root(slug),
        }}
        size="m"
        startContent={<Avatar shape="square" size="s" src={logoUrl} />}
        endIcon={{
          remixName: "ri-arrow-right-s-line",
        }}
      >
        {slug}
      </Button>

      <Button
        variant="secondary-light"
        onClick={close}
        size="l"
        hideText
        startIcon={{
          remixName: "ri-close-line",
        }}
      />
    </div>
  );
}
