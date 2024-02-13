import { Checkbox as NextCheckbox } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function Checkbox({ children }: PropsWithChildren) {
  return (
    <NextCheckbox radius="sm" classNames={{ label: "text-greyscale-50" }}>
      {children}
    </NextCheckbox>
  );
}
