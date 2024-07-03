import { ReactNode } from "react";

interface Variants {
  size: "xs" | "s" | "m" | "ml" | "l" | "xl" | "xxl";
  shape: "round" | "square";
  container: "light" | "brand";
}

interface ClassNames {
  base: string;
  img: string;
  fallback: string;
  name: string;
}

export interface AvatarPort extends Partial<Variants> {
  /**
   * Classname to change the classNames of the element. if className is passed, it will be added to the base slot.
   * @default undefined
   */
  classNames?: Partial<ClassNames>;
  /**
   * the source of the image
   * @default undefined
   */
  src?: string;
  alt?: string;
  /**
   * The name of the person in the avatar. - if src has loaded, the name will be used as the alt attribute of the img
   * @default undefined
   */
  name?: string;
  /**
   * If false, the avatar will show the background color while loading.
   * @default true
   */
  showFallback?: boolean;
  /**
   * Custom fallback component.
   * @default undefined
   */
  fallback?: ReactNode;
}
