import { Typography } from "components/layout/typography/typography";

import { TSummary } from "./summary.types";

export function Summary({ shortDescription }: TSummary.Props) {
  return (
    <Typography variant="body-m" className="ml-px line-clamp-2 max-w-[80%] text-greyscale-200">
      {shortDescription}
    </Typography>
  );
}
