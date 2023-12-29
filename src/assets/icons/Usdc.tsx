import { cn } from "src/utils/cn";
import { IMAGES } from "../img";

type Props = {
  className?: string;
};

export default function Usdc({ className }: Props) {
  return <img src={IMAGES.icons.usdc} className={cn("h-8 w-8", className ? className : null)} loading="lazy" />;
}
