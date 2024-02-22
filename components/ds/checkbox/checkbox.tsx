import { Checkbox as NextCheckbox } from "@nextui-org/react";

import { TCheckbox } from "components/ds/checkbox/checkbox.types";

export function Checkbox(props: TCheckbox.Props) {
  return <NextCheckbox radius="sm" classNames={{ label: "text-greyscale-50" }} {...props} />;
}
