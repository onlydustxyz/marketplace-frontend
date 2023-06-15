import { PropsWithChildren } from "react";
import BaseCard from "src/components/Card";

export default function Card({ children }: PropsWithChildren) {
  return (
    <BaseCard padded={false} className="p-4 flex flex-col gap-4">
      {children}
    </BaseCard>
  );
}
