import { Avatar as NextAvatar } from "@nextui-org/react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { avatarVariants } from "components/ds/avatar/avatar.variants";

export function Avatar(props: TAvatar.Props) {
  // size prop needs to be extracted or it conflicts with the size prop from NextAvatar
  const { size, className, ...restProps } = props;

  return (
    <NextAvatar
      fallback={<img src={IMAGES.logo.space} alt="OnlyDust" loading="lazy" />}
      className={cn(avatarVariants({ size, ...restProps }), className)}
      imgProps={{ loading: "lazy" }}
      classNames={{
        fallback: "w-full",
        img: "bg-greyscale-900",
      }}
      {...restProps}
    />
  );
}
