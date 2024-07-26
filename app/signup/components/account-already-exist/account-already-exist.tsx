import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function AccountAlreadyExist() {
  return (
    <Typo as="div" size="s" classNames={{ base: "py-2.5" }}>
      <Translate token="v2.pages.signup.accountAlreadyExist.label" as={"span"} />
      &nbsp;
      <BaseLink href={NEXT_ROUTER.signup.root}>
        <Translate
          token="v2.pages.signup.accountAlreadyExist.link"
          className="cursor-pointer text-text-2"
          as={"span"}
        />
      </BaseLink>
    </Typo>
  );
}
