"use client";

import { Avatar as NextAvatar } from "@nextui-org/react";
import Image from "next/image";
import * as process from "process";
import { useMemo, useState } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { avatarVariants } from "components/ds/avatar/avatar.variants";
import { Link } from "components/ds/link/link";
import { useClientOnly } from "components/layout/client-only/client-only";

export function Avatar(props: TAvatar.Props) {
  const isClient = useClientOnly();
  const [isError, setIsError] = useState(false);
  // size prop needs to be extracted or it conflicts with the size prop from NextAvatar
  const { size, className, isBordered = true, ...restProps } = props;

  const isRemoteImage = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && props.src) {
      return !props.src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  }, [props, isClient]);

  const sizeFromVariant = useMemo(() => {
    const size = props.size;
    const dpr = isClient ? window.devicePixelRatio : 1;
    switch (size) {
      case "xs":
        return { w: 16 * dpr, h: 16 * dpr };
      case "s":
        return { w: 24 * dpr, h: 24 * dpr };
      case "m":
        return { w: 32 * dpr, h: 32 * dpr };
      case "l":
        return { w: 40 * dpr, h: 40 * dpr };
      case "xl":
        return { w: 48 * dpr, h: 48 * dpr };
      case "2xl":
        return { w: 64 * dpr, h: 64 * dpr };
      case "3xl":
        return { w: 80 * dpr, h: 80 * dpr };
      case "4xl":
        return { w: 96 * dpr, h: 96 * dpr };
      default:
        return { w: 16 * dpr, h: 16 * dpr };
    }
  }, [props, isClient]);

  const optimizeSrc = useMemo(() => {
    if (isError) {
      return IMAGES.logo.space;
    }
    if (isRemoteImage && sizeFromVariant) {
      const size = sizeFromVariant;
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${size.w},height=${size.h},fit=cover/${props.src}`;
    }

    return props.src;
  }, [isRemoteImage, sizeFromVariant, isError, isClient]);

  return (
    <NextAvatar
      fallback={
        <Image
          src={IMAGES.logo.space}
          width={sizeFromVariant.w}
          height={sizeFromVariant.h}
          alt="OnlyDust"
          loading="lazy"
        />
      }
      className={cn(avatarVariants({ size, ...restProps }), className, { "border-none": !isBordered })}
      imgProps={{
        loading: "lazy",
        onError: () => {
          setIsError(true);
        },
      }}
      classNames={{
        fallback: "w-full",
        img: "bg-greyscale-900 !opacity-100",
      }}
      {...restProps}
      src={optimizeSrc}
    />
  );
}
// empty space
Avatar.Labelled = function AvatarLabelled({
  children,
  href,
  avatarProps,
  labelProps,
  className,
}: TAvatar.LabelledProps) {
  const wrapperClassName = cn("flex items-center gap-2 truncate", className);

  function renderContent() {
    const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
    const { className: avatarClassName, ...restAvatarProps } = avatarProps ?? {};

    return (
      <>
        <Avatar size="s" className={avatarClassName} {...restAvatarProps} />
        <div className={cn("od-text-body-s truncate text-greyscale-50", labelClassName)} {...restLabelProps}>
          {children}
        </div>
      </>
    );
  }

  if (href) {
    return (
      <Link href={href} className={wrapperClassName}>
        {renderContent()}
      </Link>
    );
  }

  return <div className={wrapperClassName}>{renderContent()}</div>;
};
