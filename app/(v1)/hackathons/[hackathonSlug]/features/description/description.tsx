import { TDescription } from "app/(v1)/hackathons/[hackathonSlug]/features/description/description.types";

import MarkdownPreview from "src/components/MarkdownPreview";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";

export function Description({ description }: TDescription.Props) {
  if (!description) return null;

  return (
    <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-2" }}>
      <Typo size={"s"}>
        <MarkdownPreview>{description}</MarkdownPreview>
      </Typo>
    </Paper>
  );
}
