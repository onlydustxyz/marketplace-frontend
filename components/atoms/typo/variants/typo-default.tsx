import { TypoCore } from "../typo.core";
import { TTypoProps } from "../typo.types";

export const Typo = ({ ...props }: TTypoProps) => {
  return <TypoCore {...props} />;
};
