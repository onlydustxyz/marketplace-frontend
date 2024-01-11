import { PropsWithChildren } from "react";
import BaseCard from "src/components/Card";

export default function Card({ children }: PropsWithChildren) {
  return (
    <BaseCard padded={false} withBg={false} className="flex flex-col gap-4 bg-white/2 p-4">
      {children}
    </BaseCard>
  );
}
