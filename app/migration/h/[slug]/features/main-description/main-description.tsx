import MarkdownPreview from "src/components/MarkdownPreview";

import { Card } from "components/ds/card/card";

import { TMainDescription } from "./main-description.types";

export function MainDescription({ description }: TMainDescription.Props) {
  if (!description) {
    return null;
  }
  return (
    <Card background={"base"} border={"light"}>
      <MarkdownPreview>{description}</MarkdownPreview>
    </Card>
  );
}
