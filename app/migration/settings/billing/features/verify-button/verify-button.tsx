import { useStackVerify } from "src/App/Stacks/Stacks";
import { MeTypes } from "src/api/me/types";

import { Button } from "components/ds/button/button";

import { TVerifyButton } from "./verify-button.types";

export function VerifyButton({ type, id }: TVerifyButton.Props) {
  const [openVerify] = useStackVerify();

  const onVerify = () => {
    if (type === MeTypes.billingProfileType.Individual) {
      openVerify({ levelName: "basic-kyc-level", externalId: id });
    } else {
      openVerify({ levelName: "basic-kyb-level", externalId: id });
    }
  };

  return <Button onClick={onVerify}>Verify {type}</Button>;
}
