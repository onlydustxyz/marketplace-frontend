import { TSkeleton } from "components/ds/skeleton/skeleton.types";

import { TThumbnail } from "../thumbnail/thumbnail.types";

export namespace TThumbnailGroup {
  type Thumbnail = {
    src?: string;
    alt: string;
    className?: string;
  };

  export interface Props extends TThumbnail.Variants {
    className?: string;
    defaultSrc?: boolean;
    thumbnails: Thumbnail[];
  }

  export interface LoadingProps extends TThumbnail.Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
  }
}
