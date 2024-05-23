import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Card from "src/components/Card";

import { Button } from "components/ds/button/button";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteeSuccessPage({ back }: { back: () => void }) {
  const { T } = useIntl();

  return (
    <Card className="relative flex max-w-3xl justify-center px-6 pb-12 pt-20 lg:px-12 xl:px-24" padded={false}>
      <div className="absolute -top-10">
        <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <Typography variant={"title-l"} translate={{ token: "v2.pages.committees.applicant.success.title" }} />

        <Typography
          variant={"body-m"}
          translate={{
            token: "v2.pages.committees.applicant.success.description",
          }}
          className={"whitespace-pre-line leading-normal"}
        />

        <div className="flex flex-col items-center gap-6">
          <Button size={"l"} onClick={back}>
            {T("v2.pages.committees.applicant.success.back")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
