import Tag from "@/components/ds/tag/tag.tsx";
import Translate from "@/components/layout/translate/translate.tsx";
import React from "react";
import { Typography } from "@/components/layout/typography/typography.tsx";
import { Icon } from "@/components/layout/icon/icon.tsx";

type Props = {
  variant?: "default" | "error";
  isHiring: boolean;
};
export default function HiringTag({ variant = "default", isHiring = false }: Props) {
  return isHiring ? (
    <header className="absolute -top-3.5 right-3.5">
      <Tag size="small" borderColor={variant === "error" ? "orange" : undefined}>
        <Icon remixName="ri-record-circle-line" size={12} />
        <Typography variant="body-xs">
          <Translate token="project.hiring" />
        </Typography>
      </Tag>
    </header>
  ) : null;
}
