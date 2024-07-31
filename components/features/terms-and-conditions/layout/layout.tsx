import { bootstrap } from "core/bootstrap";

import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

import { Content } from "../content/content";
import { TLayout } from "./layout.types";

export function Layout({ handleTerms, isTermsAccepted, hasAlreadyAccepted }: TLayout.Props) {
  return (
    <>
      <Content />

      <Paper
        container="2"
        size="s"
        classNames={{
          base: "flex gap-3 items-center",
        }}
      >
        <Paper container="3" size="s">
          <Switch onChange={handleTerms} isActive={isTermsAccepted} isDisabled={hasAlreadyAccepted} />
        </Paper>

        <div className="flex flex-col">
          <Typo size="l" weight="medium" translate={{ token: "v2.pages.legalNotice.common.agree.title" }} />
          <Typo size="s" color="text-2">
            <Translate token="v2.pages.legalNotice.common.agree.description.full" />{" "}
            <BaseLink
              href={bootstrap.getLegalHelperPort().getTermsAndConditionsUrl()}
              className="text-text-1 underline"
            >
              <Translate token="v2.pages.legalNotice.common.agree.description.terms" />
            </BaseLink>{" "}
            <Translate token="v2.pages.legalNotice.common.agree.description.and" />{" "}
            <BaseLink href={bootstrap.getLegalHelperPort().getPrivacyPolicyUrl()} className="text-text-1 underline">
              <Translate token="v2.pages.legalNotice.common.agree.description.privacy" />
            </BaseLink>
          </Typo>
        </div>
      </Paper>
    </>
  );
}
