import { ComponentProps } from "react";
import { DesktopView } from "./DesktopView";
import { MobileView } from "./MobileView";

export function Filter(props: ComponentProps<typeof DesktopView | typeof MobileView>) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopView {...props} />
      </div>

      <div className="md:hidden">
        <MobileView {...props} />
      </div>
    </>
  );
}
