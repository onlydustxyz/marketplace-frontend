import { Avatar as NextAvatar } from "@nextui-org/avatar";
import Image from "next/image";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { getAvatarImageSize, getAvatarSrc } from "components/atoms/avatar/avatar.utils";

import { TAvatarProps } from "./avatar.types";
import { AvatarCoreVariants } from "./avatar.variants";

export function AvatarCore({ classNames, src, ...props }: TAvatarProps) {
  const { size, shape, background, ...nextUiProps } = props;
  const slots = AvatarCoreVariants({ size, shape, background });
  const imageSize = getAvatarImageSize(props.size);
  const imageSrc = getAvatarSrc(imageSize, src);

  const fallback = (() => {
    if (props.name) {
      return undefined;
    }

    return (
      <Image
        src={IMAGES.logo.space}
        width={40}
        height={40}
        alt="OnlyDust"
        loading="lazy"
        className={"h-full w-full object-cover object-center"}
      />
    );
  })();

  return (
    <NextAvatar
      showFallback={true}
      fallback={fallback}
      classNames={{
        base: cn(slots.base(), classNames?.base),
        fallback: cn(slots.fallback(), classNames?.fallback),
        img: cn(slots.img(), classNames?.img),
        name: cn(slots.name(), classNames?.name),
        icon: cn(slots.icon(), classNames?.icon),
      }}
      {...nextUiProps}
      src={imageSrc}
    />
  );
}
