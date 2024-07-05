import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

interface Cta {
  text: string;
  href: string;
  isExternal?: boolean;
  icon?: RemixIconsName;
}

export interface PageBannerProps {
  message: string;
  cta?: Cta;
  onClose?: () => void;
}
