import { BaseLink } from "components/layout/base-link/base-link";
import { Helper } from "components/molecules/helper";

export function NewAppHelper({ projectSlug }: { projectSlug: string }) {
  return (
    <Helper
      title={{
        translate: {
          token: "v2.features.banners.newApp.title",
        },
      }}
      text={{
        translate: {
          token: "v2.features.banners.newApp.text",
        },
      }}
      endButton={{
        as: BaseLink,
        htmlProps: {
          href: "https://admin.onlydust.com/manage-projects/" + projectSlug,
        },
        variant: "primary",
        translate: {
          token: "v2.features.banners.newApp.button",
        },
      }}
    />
  );
}
