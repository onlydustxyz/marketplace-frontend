import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Card from "src/components/Card";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteePublicPage({ type }: { type: "applicant" | "jury" }) {
  const { T } = useIntl();

  const isApplicant = type === "applicant";

  return (
    <Card className="relative m-auto flex max-w-3xl justify-center px-6 pb-12 pt-20 lg:px-12 xl:px-24" padded={false}>
      <div className="absolute -top-10">
        <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <Typography
          variant={"title-l"}
          translate={{
            token: isApplicant ? "v2.pages.committees.applicant.public.title" : "v2.pages.committees.jury.public.title",
          }}
        />

        <Typography
          variant={"body-m"}
          translate={{
            token: isApplicant
              ? "v2.pages.committees.applicant.public.description"
              : "v2.pages.committees.jury.public.description",
          }}
          className={"whitespace-pre-line leading-normal"}
        />

        <div className="flex flex-col items-center gap-6">
          <Button as={BaseLink} href={NEXT_ROUTER.signup.root} size={"l"}>
            <Icon remixName={"ri-github-fill"} size={20} />
            {T("v2.pages.committees.applicant.public.login")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
