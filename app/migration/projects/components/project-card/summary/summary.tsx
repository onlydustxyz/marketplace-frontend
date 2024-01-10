import { Typography } from "@/components/layout/typography/typography.tsx";
import { TSummary } from "./summary.types";

export function Summary({ shortDescription }: TSummary.Props) {
  return (
    <Typography variant="body-m" className="ml-px line-clamp-2">
      {shortDescription}
    </Typography>
  );
}
