import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";

export function AccountAlreadyExist() {
  return (
    <Typo as="div" size="s" classNames={{ base: "py-2.5" }}>
      <Translate token="v2.pages.signup.accountAlreadyExist.label" as={"span"} />
      &nbsp;
      <Translate token="v2.pages.signup.accountAlreadyExist.link" as={"a"} className="cursor-pointer text-text-2" />
    </Typo>
  );
}
