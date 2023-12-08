import LordLogo from "src/assets/img/Lords.png";
import { cn } from "src/utils/cn";

type Props = {
  className?: string;
};

export default function Lords({ className }: Props) {
  return <img src={LordLogo} className={cn("h-8 w-8", className ? className : null)} />;
}
