import { PropsWithAdapter } from "components/types/props-with-adapter";

import { CheckboxPort } from "./checkbox.types";

export function CheckboxCore({ Adapter, ...props }: PropsWithAdapter<CheckboxPort>) {
  return <Adapter {...props} />;
}
