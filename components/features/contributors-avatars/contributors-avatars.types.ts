import { Leader } from "src/types.ts";
import { TThumbnail } from "@/components/ds/thumbnail/thumbnail.types";

export namespace TContributorsAvatars {
  export interface Props extends TThumbnail.Variants {
    contributors: Leader[];
  }
}
