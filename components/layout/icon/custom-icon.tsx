import dynamic from "next/dynamic";

import { TCustomIcon } from "./custom-icon.types";

const WhaleIcon = dynamic(() => import("./icons/whale").then(mod => mod.WhaleIcon));
const VerifiedIcon = dynamic(() => import("components/layout/icon/icons/verified").then(mod => mod.VerifiedIcon));

export function CustomIcon({ name, ...props }: TCustomIcon.Props) {
  const customIcons: { [key in TCustomIcon.Names]: JSX.Element } = {
    whale: <WhaleIcon {...props} />,
    verified: <VerifiedIcon {...props} />,
  };

  return <>{customIcons[name as TCustomIcon.Names]}</>;
}
