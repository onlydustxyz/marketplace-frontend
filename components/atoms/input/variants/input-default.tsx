import { NextUiAdapters } from "components/atoms/input/adapters/next-ui-adapters";

import { InputCore } from "../input.core";
import { InputInterface } from "../input.types";

export function Input({ ...props }: InputInterface) {
  return <InputCore Component={NextUiAdapters} {...props} />;
}
