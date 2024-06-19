import { InputNextUiAdapter } from "components/atoms/input/adapters/next-ui/next-ui.adapter";

import { InputCore } from "../input.core";
import { InputPort } from "../input.types";

export function Input({ ...props }: InputPort) {
  return <InputCore Adapter={InputNextUiAdapter} {...props} />;
}
