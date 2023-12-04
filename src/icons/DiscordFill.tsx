import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function DiscordFill({ className }: Props) {
  return <i className={cn("ri-discord-fill", className)} />;
}
