import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function WhatsappFill({ className }: Props) {
  return <i className={cn("ri-whatsapp-fill", className)} />;
}
