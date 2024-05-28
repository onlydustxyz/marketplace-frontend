import { Error } from "components/layout/error/error";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteeErrorPage({ type }: { type: "applicant" | "jury" }) {
  const { T } = useIntl();
  const [descStart, descLink, descEnd] = T("v2.pages.committees.applicant.private.error.description").split("_");

  const isApplicant = type === "applicant";

  return (
    <div className="relative m-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card-background-base">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div className={"p-12"}>
        <Error
          title={T(
            isApplicant
              ? "v2.pages.committees.applicant.private.error.title"
              : "v2.pages.committees.jury.private.error.title"
          )}
          message={
            <>
              {descStart}
              <a className="underline" href={"mailto:contact@onlydust.xyz"}>
                {descLink}
              </a>
              {descEnd}
            </>
          }
        />
      </div>
    </div>
  );
}
