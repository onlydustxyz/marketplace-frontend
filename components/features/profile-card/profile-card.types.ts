import { PopoverProps } from "@nextui-org/react";
import { PublicProfilerankCategoryUnion } from "api-client/resources/users/types";
import { PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { avatarVariants } from "components/ds/avatar/avatar.variants";
import { TSkeleton } from "components/ds/skeleton/skeleton.types";
import { tagVariants } from "components/ds/tag/tag.variants";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { typographyVariants } from "components/layout/typography/typography.variants";

export namespace TProfileCard {
  export type Variants = VariantProps<typeof avatarVariants | typeof tagVariants | typeof typographyVariants>;
  type basePopOverProps = Partial<Omit<PopoverProps, "children">>;
  export interface ProfileStatProps {
    icon: RemixIconsName;
    token: string;
    count?: number;
  }
  export interface Props extends PropsWithChildren {
    className?: string;
    isLoginClickable?: boolean;
    avatarUrl: string;
    login: string;
    rankCategory?: PublicProfilerankCategoryUnion;
    contributionCount?: number;
    rewardCount?: number;
    contributedProjectCount?: number;
    leadedProjectCount?: number;
    rank?: number;
    rankPercentile?: number;
  }

  export interface ProfilePopoverProps extends PropsWithChildren, basePopOverProps {
    className?: string;
    githubId: number;
    isPreload?: boolean;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
    animate?: boolean;
  }
}
