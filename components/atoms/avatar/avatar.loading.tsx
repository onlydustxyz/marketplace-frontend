import { cn } from "@nextui-org/react";

import { AvatarPort } from "components/atoms/avatar/avatar.types";
import { getAvatarImageSize } from "components/atoms/avatar/avatar.utils";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function AvatarLoading({ size, shape }: AvatarPort) {
  const [w, h] = getAvatarImageSize(size);

  return <SkeletonEl variant="rounded" width={w} height={h} className={cn({ "rounded-full": shape !== "square" })} />;
}
