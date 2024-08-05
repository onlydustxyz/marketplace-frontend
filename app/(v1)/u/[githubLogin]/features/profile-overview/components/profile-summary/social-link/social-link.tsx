"use client";

import { TSocialLink } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/profile-summary/social-link/social-link.types";

import { useShowToaster } from "src/hooks/useToaster";
import { copyClickHandlerFactory } from "src/utils/clickHandler";

import { Button } from "components/ds/button/button";

import { useIntl } from "hooks/translate/use-translate";

export function SocialLink({ link, copyableValue, copyableValueName, children }: TSocialLink.Props) {
  const showToaster = useShowToaster();
  const { T } = useIntl();

  if (!link && !copyableValue) return null;

  const Component = link ? "a" : "button";

  const linkProps = { href: link, target: "_blank", rel: "noreferrer" };
  const copyProps = {
    onClick: copyClickHandlerFactory(copyableValue || "", () => {
      showToaster(T("profile.valueCopiedToClipboard", { valueName: copyableValueName }));
    }),
  };

  const props = link ? linkProps : copyProps;
  return (
    <>
      <Button
        as={Component}
        size="m"
        variant="secondary"
        iconOnly
        className="h-10 w-10 items-center justify-center rounded-xl border-none bg-noise-heavy p-2"
        {...props}
      >
        {children}
      </Button>
    </>
  );
}
