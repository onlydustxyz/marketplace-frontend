import { Leader } from "../../../app/migration/projects/types/projects.types.ts";
import { ThumbnailVariant } from "@/components/ds/thumbnail/thumbnail.variant.ts";
export interface ContributorsAvatarsProps extends ThumbnailVariant {
  contributors: Leader[];
}
