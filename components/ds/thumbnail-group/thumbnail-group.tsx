import { cn } from "../../../src/utils/cn.ts";
import { ThumbnailGroupProps } from "@/components/ds/thumbnail-group/thumbnail-group.type.ts";
import React from "react";
import { Thumbnail } from "@/components/ds/thumbnail";
export function ThumbnailGroup({ thumbnails, className, defaultSrc = true, ...props }: ThumbnailGroupProps) {
  return (
    <div className={cn("flex flex-row -space-x-1", className)}>
      {thumbnails.map(thumbnail => (
        <Thumbnail {...thumbnail} {...props} defaultSrc={defaultSrc} />
      ))}
    </div>
  );
}

export default ThumbnailGroup;
