import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

interface BaseCta {
  text: string;
  icon?: RemixIconsName;
}

interface HrefCta extends BaseCta {
  href: string;
  isExternal?: boolean;
  onClick?: never;
}

interface OnClickCta extends BaseCta {
  href?: never;
  isExternal?: never;
  onClick: () => void;
}

type Cta = HrefCta | OnClickCta;

export interface PageBannerProps {
  message: string;
  cta?: Cta;
  onClose?: () => void;
}
