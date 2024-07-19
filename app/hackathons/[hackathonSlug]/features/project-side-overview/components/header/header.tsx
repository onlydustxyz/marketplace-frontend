"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { THeader } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/header/header.types";

import { Avatar } from "components/atoms/avatar";
import { ButtonSecondaryLight } from "components/atoms/button/variants/button-secondary-light";

import { NEXT_ROUTER } from "constants/router";

export function Header({ slug, logoUrl }: THeader.Props) {
  const router = useRouter();
  const {
    project: { close },
  } = useContext(HackathonContext);

  function handleRedirectToProject() {
    if (slug) {
      router.push(NEXT_ROUTER.projects.details.root(slug));
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <ButtonSecondaryLight
        onClick={handleRedirectToProject}
        size="l"
        startContent={<Avatar shape="square" size="s" src={logoUrl} />}
        endIcon={{
          remixName: "ri-arrow-right-s-line",
        }}
      >
        {slug}
      </ButtonSecondaryLight>

      <ButtonSecondaryLight
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